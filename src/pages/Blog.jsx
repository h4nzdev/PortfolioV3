import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Volume2, VolumeX, Terminal } from 'lucide-react';
import { BLOG_CATEGORIES, getAllPosts } from '../data/blog/blogPosts';
import BlogHero from '../components/blog/BlogHero';
import BlogFilterBar from '../components/blog/BlogFilterBar';
import BlogCard from '../components/blog/BlogCard';
import { sound } from '../utils/sound';
import logoImg from '../assets/logo.png';

export default function Blog() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allPosts = useMemo(() => getAllPosts(), []);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // Featured post for hero (first featured post or first post in list)
  const featuredPost = useMemo(() => {
    return allPosts.find((p) => p.featured) || allPosts[0];
  }, [allPosts]);

  const handleReturn = () => {
    sound.playClick();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#171715] selection:bg-[#C8B99A] selection:text-[#171715] relative pb-20">
      {/* Top Fixed Control Bar */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 bg-[#F8F7F2]/80 backdrop-blur-md border-b border-[#C8B99A]/40 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Return to Portfolio button */}
          <button
            type="button"
            onClick={handleReturn}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#C8B99A]/60 hover:border-[#171715] text-xs font-mono text-[#171715] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Return to Portfolio</span>
          </button>

          {/* Center Brand Monogram */}
          <Link
            to="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold font-['Space_Grotesk'] text-[#171715] hover:opacity-80 transition-opacity"
          >
            <span className="w-2 h-2 rounded-full bg-[#171715] animate-pulse" />
            <span>h4nz.dev</span>
            <span className="font-mono text-[#85847E] font-normal">/ blog</span>
          </Link>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-white/90 border border-[#C8B99A]/60 text-[#171715] hover:bg-[#F2ECE1] transition-all shadow-2xs cursor-pointer"
            title={isMuted ? 'Enable sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Editorial Page Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-[#85847E] uppercase tracking-wider mb-2">
            <Terminal size={14} className="text-[#C8B99A]" />
            <span>Field Notes & System Case Studies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-['Space_Grotesk'] tracking-tight text-[#171715] mb-4">
            Engineering Dispatches.
          </h1>
          <p className="text-base sm:text-lg text-[#55524B] max-w-2xl leading-relaxed">
            Technical reflections on building distributed systems, embedded edge vision models, resilient microservices, and modern web architectures.
          </p>
        </div>

        {/* Featured Hero Article (shown only when no search query is active) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="mb-12">
            <BlogHero post={featuredPost} />
          </div>
        )}

        {/* Search & Category Filter */}
        <BlogFilterBar
          categories={BLOG_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredPosts.length}
        />

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-white/60 border border-[#C8B99A]/40 p-8">
            <BookOpen size={36} className="mx-auto text-[#C8B99A] mb-3 opacity-60" />
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#171715] mb-1">
              No dispatches match your query
            </h3>
            <p className="text-sm text-[#73716A] mb-5">
              Try adjusting your search terms or clearing the selected category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-full text-xs font-mono font-semibold bg-[#171715] text-[#F8F7F2] hover:bg-[#33322E] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer Emblem */}
      <footer className="mt-24 pt-8 border-t border-[#C8B99A]/30 text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="w-7 h-7 object-contain opacity-80" />
            <span className="text-xs font-mono text-[#85847E]">
              © {new Date().getFullYear()} Hanz Magbal • Written with precision
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#66635B]">
            <Link to="/" className="hover:text-[#171715] transition-colors">
              Portfolio
            </Link>
            <span>•</span>
            <a
              href="https://github.com/h4nzdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#171715] transition-colors flex items-center gap-1"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
