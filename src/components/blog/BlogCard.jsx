import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { formatBlogDate } from '../../utils/blogUtils';
import { sound } from '../../utils/sound';

export default function BlogCard({ post }) {
  const handleClick = () => {
    sound.playClick();
  };

  return (
    <article className="group relative rounded-2xl bg-white/80 border border-[#C8B99A]/40 hover:border-[#171715]/40 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md shadow-xs hover:shadow-lg hover:-translate-y-1">
      <div>
        {/* Top Meta Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-[#F4EFE6] text-[#171715] border border-[#C8B99A]/40">
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-xs font-mono text-[#85847E]">
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

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#171715] group-hover:text-[#8C7A5B] transition-colors leading-tight mb-3">
          <Link to={`/blog/${post.slug}`} onClick={handleClick}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#5C5952] leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Card Footer: Tags & Read Link */}
      <div className="pt-4 border-t border-[#C8B99A]/20 flex items-center justify-between gap-4 mt-auto">
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#C8B99A]/30 text-[#66635B]"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-[10px] font-mono text-[#85847E]">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        <Link
          to={`/blog/${post.slug}`}
          onClick={handleClick}
          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#171715] group-hover:text-[#8C7A5B] transition-colors shrink-0"
        >
          <span>Read Dispatch</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
