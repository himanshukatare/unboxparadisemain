import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BLOG_META } from '../component/PageMeta';

const SITE = 'https://www.unboxparadise.com';

const BLOG_DATES = {
  'corporate-gifting-seo': '2025-12-02',
  'employee-onboarding-welcome-kits-2026': '2026-01-12',
  'employee-onboarding-kits-2026': '2026-01-12',
  'diwali-corporate-gifting-ideas-2026': '2026-09-05',
  'employee-onboarding-kit-ideas': '2026-08-28',
  'academic-and-edtech-kits-guide': '2026-08-20',
  'corporate-gifting-in-pune-bhopal': '2026-09-10'
};

const BlogPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Fetch the static HTML file from public/blogs/
        const response = await fetch(`/blogs/${slug}.html`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const html = await response.text();
        
        // Extract the content from <main> tag
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const mainContent = doc.querySelector('main') || doc.querySelector('article');
        
        if (mainContent) {
          setContent(mainContent.innerHTML);
        } else {
          setContent(html);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white">
        <div className="rounded-full border-4 border-white/20 border-t-white/70 h-12 w-12 animate-spin mr-4" />
        <span className="text-lg font-semibold tracking-wide">Loading blog...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const meta = BLOG_META[slug] || null;
  const articleSchema = meta ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': meta.title.replace(/\s*\|\s*Unbox Paradise$/, ''),
    'description': meta.description,
    'author': { '@type': 'Organization', 'name': 'Unbox Paradise' },
    'publisher': {
      '@type': 'Organization',
      'name': 'Unbox Paradise',
      'logo': { '@type': 'ImageObject', 'url': `${SITE}/resource/logo.png` }
    },
    'datePublished': BLOG_DATES[slug] || '2026-01-01',
    'url': `${SITE}/blogs/${slug}`
  } : null;

  return (
    <div className="min-h-screen pt-48 px-6" style={{ background: 'rgb(19,19,24)' }}>
      {articleSchema && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      )}
      <div className="max-w-3xl mx-auto text-white">
        <div 
          className="prose prose-invert max-w-none
            prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3
            prose-p:text-base prose-p:leading-relaxed prose-p:mb-4
            prose-ul:list-disc prose-ul:ml-6 prose-li:mb-2
            prose-a:text-blue-400 prose-a:hover:underline
          "
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </div>
  );
};

export default BlogPage;
