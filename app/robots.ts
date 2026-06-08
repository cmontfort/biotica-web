import type { MetadataRoute } from 'next';

// /connect is intentionally disallowed from indexing (legal-ops 2026-06-08):
// the investor-contact page is kept reachable but out of search indexes to
// narrow the "general solicitation" surface area. The page also sets a
// robots:noindex meta tag; this is the belt-and-suspenders crawl directive.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/connect', '/api/'],
    },
  };
}
