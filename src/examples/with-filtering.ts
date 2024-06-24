import { getSitemapEntries } from '..';

(async () => {
	const array = await getSitemapEntries(
		'https://www.originate.com/sitemap.xml',
		/posts/g
	);
	console.log(array.length);
})();
