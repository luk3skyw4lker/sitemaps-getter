import { getSitemapEntries } from '..';

(async () => {
	const array = await getSitemapEntries(
		'https://www.originate.com/sitemap.xml'
	);
	console.log(array.length);
})();
