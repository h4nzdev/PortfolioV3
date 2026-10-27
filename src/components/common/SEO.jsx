import { useEffect } from 'react';
import { SITE_CONFIG } from '../../utils/seoConfig';

/**
 * Lightweight, zero-dependency, React 19 compatible SEO & Meta tags manager.
 * Injects dynamic titles, OpenGraph, Twitter Cards, Canonical links, and JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaData,
}) {
  useEffect(() => {
    // 1. Dynamic Page Title
    const finalTitle = title
      ? `${title} | Hanz Magbal`
      : SITE_CONFIG.defaultTitle;
    document.title = finalTitle;

    // Helper to update or create a meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const finalDesc = description || SITE_CONFIG.defaultDescription;
    const finalKeywords = keywords || SITE_CONFIG.defaultKeywords;
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.siteUrl);
    const finalImage = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.siteUrl}${ogImage}`)
      : `${SITE_CONFIG.siteUrl}${SITE_CONFIG.defaultOgImage}`;

    // 2. Standard Primary Meta Tags
    setMetaTag('name', 'description', finalDesc);
    setMetaTag('name', 'keywords', finalKeywords);
    setMetaTag('name', 'author', SITE_CONFIG.author);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLinkTag('canonical', currentUrl);

    // 3. Open Graph Tags (Facebook, LinkedIn, Discord)
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', SITE_CONFIG.siteName);
    setMetaTag('property', 'og:locale', 'en_US');

    // 4. Twitter Card Meta Tags (X / Twitter)
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', SITE_CONFIG.handle);
    setMetaTag('name', 'twitter:creator', SITE_CONFIG.handle);
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalImage);

    // 5. JSON-LD Structured Data for Google Knowledge Graph
    const scriptId = 'json-ld-seo-schema';
    let scriptTag = document.getElementById(scriptId);

    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaData);
    } else if (scriptTag) {
      // Default to Person & WebSite schema if no specific schema provided
      const defaultSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${SITE_CONFIG.siteUrl}/#person`,
            name: SITE_CONFIG.author,
            jobTitle: 'Software Architect & Full-Stack Engineer',
            url: SITE_CONFIG.siteUrl,
            sameAs: [
              SITE_CONFIG.socials.github,
              SITE_CONFIG.socials.linkedin,
            ],
            affiliation: {
              '@type': 'EducationalOrganization',
              name: 'University of Southern Philippines Foundation',
            },
            alumniOf: 'University of Southern Philippines Foundation',
            knowsAbout: [
              'Distributed Systems',
              'React',
              'Node.js',
              'PostgreSQL',
              'Docker',
              'AWS',
              'Computer Vision',
              'Three.js',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_CONFIG.siteUrl}/#website`,
            url: SITE_CONFIG.siteUrl,
            name: SITE_CONFIG.siteName,
            publisher: { '@id': `${SITE_CONFIG.siteUrl}/#person` },
          },
        ],
      };
      scriptTag.text = JSON.stringify(defaultSchema);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaData]);

  return null;
}
