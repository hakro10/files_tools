import { TOOLS } from './data/toolsData';

export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

// Cloudflare Workers HTMLRewriter ambient typing
declare class HTMLRewriter {
  on(
    selector: string,
    handlers: {
      element?: (element: {
        setAttribute: (name: string, value: string) => void;
        getAttribute: (name: string) => string | null;
        setInnerContent: (content: string, options?: { html?: boolean }) => void;
        append: (content: string, options?: { html?: boolean }) => void;
        prepend: (content: string, options?: { html?: boolean }) => void;
        remove: () => void;
      }) => void;
    }
  ): this;
  transform(response: Response): Response;
}

interface PageMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

function getPageMetadata(pathname: string): PageMeta {
  const BASE_URL = 'https://filestools.net';

  // 1. Tool Pages (/tools/:slug)
  if (pathname.startsWith('/tools/')) {
    const slug = pathname.replace('/tools/', '').replace(/\/$/, '');
    const tool = TOOLS.find((t) => t.slug === slug);
    if (tool) {
      return {
        title: `${tool.name} - FilesTools.net (100% Client-Side)`,
        description: tool.shortDescription,
        canonicalUrl: `${BASE_URL}/tools/${tool.slug}`,
        keywords: tool.keywords.join(', '),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: tool.name,
          url: `${BASE_URL}/tools/${tool.slug}`,
          description: tool.shortDescription,
          applicationCategory: tool.category === 'File Tools' ? 'MultimediaApplication' : 'DeveloperApplication',
          operatingSystem: 'Any (Web Browser)',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          featureList: tool.features
        }
      };
    }
  }

  // 2. Compliance & Policy Pages
  if (pathname === '/privacy-policy') {
    return {
      title: 'Privacy Policy | FilesTools.net',
      description: 'Privacy Policy for FilesTools.net. Learn about our 100% client-side data processing architecture, zero server logs, and Google AdSense cookie disclosures.',
      canonicalUrl: `${BASE_URL}/privacy-policy`
    };
  }

  if (pathname === '/terms-of-service') {
    return {
      title: 'Terms of Service | FilesTools.net',
      description: 'Terms of Service and Acceptable Use Policy for FilesTools.net client-side file conversion and developer utility platform.',
      canonicalUrl: `${BASE_URL}/terms-of-service`
    };
  }

  if (pathname === '/about-us') {
    return {
      title: 'About Us | FilesTools.net',
      description: 'Learn about FilesTools.net, our mission for 100% client-side data privacy, and how we build zero-server-upload file converters and developer tools.',
      canonicalUrl: `${BASE_URL}/about-us`
    };
  }

  if (pathname === '/contact-us') {
    return {
      title: 'Contact Us | FilesTools.net',
      description: 'Get in touch with FilesTools.net engineering team for support, tool requests, bug reports, and feedback.',
      canonicalUrl: `${BASE_URL}/contact-us`
    };
  }

  // 3. Default / Homepage
  return {
    title: 'FilesTools.net | 100% Client-Side File Converters & Developer Tools',
    description: 'Convert JPG/PNG to PDF, extract PDF to JPG, compress images, decode JWTs, and format JSON/SQL directly inside your browser memory. Zero server uploads.',
    canonicalUrl: `${BASE_URL}/`,
    keywords: 'file tools, jpg to pdf, png to pdf, pdf to jpg, image compressor, json formatter, jwt decoder, sql formatter, regex tester, base64 encoder',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'FilesTools.net',
      url: `${BASE_URL}/`,
      description: '100% client-side privacy-first file conversion and developer micro-tools platform.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Force HTTPS redirect (301)
    if (url.protocol === 'http:' || request.headers.get('x-forwarded-proto') === 'http') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // 2. 301 Redirect duplicate non-canonical aliases to canonical URLs
    const ALIASES: Record<string, string> = {
      '/privacy': '/privacy-policy',
      '/terms': '/terms-of-service',
      '/about': '/about-us',
      '/contact': '/contact-us'
    };

    if (ALIASES[url.pathname]) {
      const canonicalPath = ALIASES[url.pathname];
      return Response.redirect(`https://${url.host}${canonicalPath}${url.search}`, 301);
    }

    // 3. Explicitly serve sitemap.xml, robots.txt, and ads.txt as raw static assets
    if (url.pathname === '/sitemap.xml') {
      const assetResponse = await env.ASSETS.fetch(request);
      const headers = new Headers(assetResponse.headers);
      headers.set('Content-Type', 'application/xml; charset=utf-8');
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers
      });
    }

    if (url.pathname === '/robots.txt' || url.pathname === '/ads.txt') {
      const assetResponse = await env.ASSETS.fetch(request);
      const headers = new Headers(assetResponse.headers);
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers
      });
    }

    // 4. Allow static assets (CSS, JS, SVG, images, fonts) to pass through directly
    if (url.pathname.startsWith('/assets/') || /\.(js|css|svg|png|jpg|jpeg|webp|ico|woff|woff2|ttf|txt|xml)$/i.test(url.pathname)) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    // 5. Handle HTML Pages with Edge HTMLRewriter Meta & Canonical Injection
    const htmlResponse = await env.ASSETS.fetch(request);
    const meta = getPageMetadata(url.pathname);

    // Stream-rewrite the HTML <head> with exact canonical URL, title, description, and structured data
    const rewriter = new HTMLRewriter()
      .on('title', {
        element(el) {
          el.setInnerContent(meta.title);
        }
      })
      .on('meta[name="description"]', {
        element(el) {
          el.setAttribute('content', meta.description);
        }
      })
      .on('link[rel="canonical"]', {
        element(el) {
          el.setAttribute('href', meta.canonicalUrl);
        }
      })
      .on('meta[property="og:title"]', {
        element(el) {
          el.setAttribute('content', meta.title);
        }
      })
      .on('meta[property="og:description"]', {
        element(el) {
          el.setAttribute('content', meta.description);
        }
      })
      .on('meta[property="og:url"]', {
        element(el) {
          el.setAttribute('content', meta.canonicalUrl);
        }
      })
      .on('meta[name="twitter:title"]', {
        element(el) {
          el.setAttribute('content', meta.title);
        }
      })
      .on('meta[name="twitter:description"]', {
        element(el) {
          el.setAttribute('content', meta.description);
        }
      })
      .on('head', {
        element(el) {
          if (meta.jsonLd) {
            el.append(
              `<script id="devsuite-json-ld" type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`,
              { html: true }
            );
          }
        }
      });

    return rewriter.transform(htmlResponse);
  }
};
