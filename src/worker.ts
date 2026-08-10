export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Explicitly serve sitemap.xml, robots.txt, and ads.txt as raw static assets
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

    // 2. Allow static assets (CSS, JS, SVG, images) to pass through directly
    if (url.pathname.startsWith('/assets/') || url.pathname.includes('.')) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    // 3. Fallback to client-side SPA router for HTML pages
    return env.ASSETS.fetch(request);
  }
};
