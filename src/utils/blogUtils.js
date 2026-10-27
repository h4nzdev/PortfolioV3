/**
 * Blog utility functions for Hanz Dev Journal
 */

/**
 * Formats ISO date string (YYYY-MM-DD) into a human-readable format.
 * @param {string} dateStr
 * @returns {string} e.g. "March 15, 2026"
 */
export function formatBlogDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Calculates estimated reading time in minutes based on text content.
 * Standard average reading speed: ~200-220 words per minute.
 * @param {string|Array} content
 * @returns {string} e.g. "5 min read"
 */
export function calculateReadTime(content) {
  let fullText = '';
  if (typeof content === 'string') {
    fullText = content;
  } else if (Array.isArray(content)) {
    fullText = content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && item.text) return item.text;
        if (item && item.code) return item.code;
        return '';
      })
      .join(' ');
  }

  const words = fullText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 210));
  return `${minutes} min read`;
}

/**
 * Generates URL-friendly slug from text.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
