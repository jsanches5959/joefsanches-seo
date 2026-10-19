const baseUrl = 'https://joefsanches.com';

/* BreadcrumbList structured data.

   Google replaces the raw URL in a search result with the breadcrumb trail
   when a page declares one. On a phone, where the URL is truncated to
   something like "joefsanches.com › posts › when-to-tri...", that is the
   difference between a result that reads as a path and one that reads as a
   place. No page on the site declared it, so every result showed the URL.

   Pass the trail without Home, which is added here, and without the current
   page's own URL — Google wants the last item to be the page itself, named but
   not linked elsewhere. */
export function breadcrumbSchema(trail) {
  const items = [{ name: 'Home', url: baseUrl }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith('http') ? item.url : baseUrl + item.url } : {}),
    })),
  };
}
