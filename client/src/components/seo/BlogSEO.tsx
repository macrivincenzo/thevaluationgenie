import React from "react";

interface BlogSEOProps {
  title: string;
  description: string;
  keywords: string;
  url: string;
  schemaMarkup?: any;
}

export const BlogSEO: React.FC<BlogSEOProps> = ({ title, description, keywords, url, schemaMarkup }) => {
  React.useEffect(() => {
    // Set document title
    document.title = title;
    
    // Helper function to set meta tags
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const setOgMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Set basic meta tags
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("author", "ValuationGenie");
    setMeta("viewport", "width=device-width, initial-scale=1.0");

    // Set Open Graph meta tags
    setOgMeta("og:title", title.substring(0, 60));
    setOgMeta("og:description", description.substring(0, 160));
    setOgMeta("og:url", url);
    setOgMeta("og:type", "article");
    setOgMeta("og:site_name", "ValuationGenie");
    setOgMeta("og:locale", "en_US");

    // Set Twitter Card meta tags
    setOgMeta("twitter:card", "summary_large_image");
    setOgMeta("twitter:title", title.substring(0, 60));
    setOgMeta("twitter:description", description.substring(0, 160));

    // Set canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Add schema markup if provided
    if (schemaMarkup) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaMarkup);
    }

    // Add structured breadcrumb data
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://thevaluationgenie.com"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Blog",
          "item": "https://thevaluationgenie.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title.split(" | ")[0],
          "item": url
        }
      ]
    };

    let breadcrumbScript = document.querySelector('script[data-schema="breadcrumb"]');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.setAttribute("type", "application/ld+json");
      breadcrumbScript.setAttribute("data-schema", "breadcrumb");
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

  }, [title, description, keywords, url, schemaMarkup]);

  return null;
};

// Internal Linking Component
interface InternalLinksProps {
  title: string;
  links: { href: string; text: string; category: string }[];
}

export const InternalLinks: React.FC<InternalLinksProps> = ({ title, links }) => {
  const categories = links.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, typeof links>);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">📚 {title}</h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        {Object.entries(categories).map(([category, categoryLinks]) => (
          <div key={category}>
            <h4 className="font-semibold mb-2">{category}:</h4>
            <ul className="space-y-1 text-blue-700">
              {categoryLinks.map((link, index) => (
                <li key={index}>• <a href={link.href} className="hover:underline">{link.text}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQ Schema Component
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  React.useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    let script = document.querySelector('script[data-schema="faq"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-schema", "faq");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqSchema);
  }, [faqs]);

  return null;
};