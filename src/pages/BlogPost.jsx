import { useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  Bookmark,
  Volume2,
  VolumeX,
  ArrowRight,
  Info,
  Lightbulb,
} from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '../data/blog/blogPosts';
import { formatBlogDate } from '../utils/blogUtils';
import ReadingProgress from '../components/blog/ReadingProgress';
import TableOfContents from '../components/blog/TableOfContents';
import CodeBlock from '../components/blog/CodeBlock';
import PostAuthorBio from '../components/blog/PostAuthorBio';
import { sound } from '../utils/sound';
import logoImg from '../assets/logo.png';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const articleRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const post = getPostBySlug(slug);
  const relatedPosts = post ? getRelatedPosts(post.slug, 2) : [];

  const handleReturn = () => {
    sound.playClick();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/blog');
    }
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleShare = async () => {
    sound.playClick();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      }
    } catch {
      setCopiedLink(false);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] text-[#171715] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-3">
          Dispatch Not Found
        </h1>
        <p className="text-sm text-[#66635B] mb-6 max-w-md">
          The requested engineering dispatch could not be located. It may have been moved or renamed.
        </p>
        <Link
          to="/blog"
          className="px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-[#171715] text-[#F8F7F2] hover:bg-[#33322E] transition-all"
        >
          Return to All Dispatches
        </Link>
      </div>
    );
  }

  return (
    <div
      key={post.slug}
      className="min-h-screen bg-[#F8F7F2] text-[#171715] selection:bg-[#C8B99A] selection:text-[#171715] relative pb-24"
    >
      {/* Viewport Reading Progress Bar */}
      <ReadingProgress targetRef={articleRef} />

      {/* Top Fixed Control Bar */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 bg-[#F8F7F2]/85 backdrop-blur-md border-b border-[#C8B99A]/40 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={handleReturn}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#C8B99A]/60 hover:border-[#171715] text-xs font-mono text-[#171715] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">All Dispatches</span>
          </button>

          {/* Breadcrumb Monogram */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#85847E]">
            <Link to="/" className="hover:text-[#171715] transition-colors">
              h4nz.dev
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#171715] transition-colors">
              blog
            </Link>
            <span>/</span>
            <span className="text-[#171715] font-semibold max-w-[200px] truncate">
              {post.category}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#C8B99A]/60 text-xs font-mono text-[#171715] hover:bg-[#F2ECE1] transition-all shadow-2xs cursor-pointer"
              title="Copy share link"
            >
              {copiedLink ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleToggleSound}
              className="p-2 rounded-full bg-white/90 border border-[#C8B99A]/60 text-[#171715] hover:bg-[#F2ECE1] transition-all shadow-2xs cursor-pointer"
              title={isMuted ? 'Enable sound' : 'Mute sound'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Post Content */}
      <main ref={articleRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        {/* Article Header Meta */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide bg-[#171715] text-[#F8F7F2]">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-[#85847E]">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {formatBlogDate(post.publishedDate)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-[#171715] leading-[1.12] tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#525049] leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#C8B99A]/30">
            <Bookmark size={13} className="text-[#85847E]" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-white/80 border border-[#C8B99A]/40 text-[#5C5952]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dual-Column Layout: Main Content + Sticky TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Reading Column */}
          <article className="lg:col-span-8 prose-custom space-y-6 text-[#292824]">
            {post.content.map((block, index) => {
              if (block.type === 'heading') {
                const Tag = block.level === 2 ? 'h2' : 'h3';
                return (
                  <Tag
                    key={index}
                    id={block.id}
                    className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715] pt-6 pb-2 border-b border-[#C8B99A]/20 scroll-mt-24"
                  >
                    {block.text}
                  </Tag>
                );
              }

              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-base sm:text-lg leading-relaxed text-[#383733]">
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'code') {
                return (
                  <CodeBlock
                    key={index}
                    code={block.code}
                    language={block.language}
                    title={block.title}
                  />
                );
              }

              if (block.type === 'callout') {
                const isInsight = block.variant === 'insight';
                return (
                  <aside
                    key={index}
                    className={`my-6 p-5 sm:p-6 rounded-2xl border ${
                      isInsight
                        ? 'bg-[#EFECE4] border-[#C8B99A]/70 text-[#171715]'
                        : 'bg-[#F2F6F0] border-emerald-300 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#171715]">
                      {isInsight ? <Lightbulb size={15} /> : <Info size={15} />}
                      <span>{block.title || 'Note'}</span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-[#403E38]">
                      {block.text}
                    </p>
                  </aside>
                );
              }

              return null;
            })}

            {/* Author Signature */}
            <div className="mt-14 pt-8 border-t border-[#C8B99A]/40">
              <PostAuthorBio />
            </div>
          </article>

          {/* Sticky Sidebar Column */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
            <TableOfContents toc={post.toc} />

            {/* Quick Share Box */}
            <div className="p-5 rounded-2xl bg-white/70 border border-[#C8B99A]/40 backdrop-blur-md shadow-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-[#85847E] block mb-2 font-bold">
                Share Dispatch
              </span>
              <p className="text-xs text-[#66635B] mb-3 leading-relaxed">
                Found this analysis useful? Share with engineers or team leads.
              </p>
              <button
                type="button"
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono font-semibold bg-[#171715] text-[#F8F7F2] hover:bg-[#33322E] transition-all cursor-pointer"
              >
                {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Article Link'}</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Next / Related Articles Footer */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#C8B99A]/40">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[#85847E] uppercase tracking-wider">
                  Further Reading
                </span>
                <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#171715]">
                  Related Field Notes
                </h3>
              </div>
              <Link
                to="/blog"
                onClick={() => sound.playClick()}
                className="text-xs font-mono font-bold text-[#171715] hover:text-[#8C7A5B] flex items-center gap-1"
              >
                <span>View all ({getAllPosts().length})</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="p-6 rounded-2xl bg-white/80 border border-[#C8B99A]/40 hover:border-[#171715]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#85847E] mb-2">
                      <span>{rel.category}</span>
                      <span>•</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="text-lg font-bold font-['Space_Grotesk'] text-[#171715] hover:text-[#8C7A5B] transition-colors mb-2">
                      <Link to={`/blog/${rel.slug}`} onClick={() => sound.playClick()}>
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-[#5C5952] line-clamp-2 mb-4">
                      {rel.excerpt}
                    </p>
                  </div>
                  <Link
                    to={`/blog/${rel.slug}`}
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#171715] hover:text-[#8C7A5B]"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer Emblem */}
      <footer className="mt-20 pt-8 border-t border-[#C8B99A]/30 text-center">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="w-7 h-7 object-contain opacity-80" />
            <span className="text-xs font-mono text-[#85847E]">
              © {new Date().getFullYear()} Hanz Magbal • Written with precision
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#66635B]">
            <Link to="/blog" className="hover:text-[#171715] transition-colors">
              All Dispatches
            </Link>
            <span>•</span>
            <Link to="/" className="hover:text-[#171715] transition-colors">
              Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
