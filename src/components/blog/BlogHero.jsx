import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, Calendar, Bookmark } from 'lucide-react';
import { formatBlogDate } from '../../utils/blogUtils';
import { sound } from '../../utils/sound';

export default function BlogHero({ post }) {
  if (!post) return null;

  const handleClick = () => {
    sound.playClick();
  };

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-[#171715] to-[#252420] text-[#F8F7F2] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-xl border border-[#3A3832]">
      {/* Subtle Background Pattern Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8B99A]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-[#C8B99A] text-[#171715] shadow-xs">
            <Sparkles size={13} />
            <span>FEATURED DISPATCH</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/90 border border-white/15">
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-xs font-mono text-[#A8A49C] ml-auto">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatBlogDate(post.publishedDate)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-white leading-tight tracking-tight mb-4">
          <Link
            to={`/blog/${post.slug}`}
            onClick={handleClick}
            className="hover:text-[#C8B99A] transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Lead Excerpt */}
        <p className="text-base sm:text-lg text-[#C8C4BC] leading-relaxed mb-8 max-w-3xl">
          {post.excerpt}
        </p>

        {/* Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <Bookmark size={14} className="text-[#C8B99A] hidden sm:inline-block" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#ECEAE5]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Link
            to={`/blog/${post.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs sm:text-sm font-bold bg-[#F8F7F2] text-[#171715] hover:bg-[#C8B99A] transition-all cursor-pointer shadow-md group"
          >
            <span>Read Complete Case Study</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
