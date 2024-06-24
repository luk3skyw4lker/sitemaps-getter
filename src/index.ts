import axios, { AxiosError } from 'axios';

export const getSitemapEntries = async (
	url: string,
	filteringRegex?: RegExp
) => {
	const locRegex = /(?<=<loc>)(.+?)(?=<\/loc>)/g;

	try {
		const allResults: string[] = [];
		const { data: xml } = await axios.get<string>(url);

		const indexes = [...new Set(xml.replace(/\n|\r/g, '').match(locRegex))];

		if (indexes.length === 0 || !indexes[0].endsWith('.xml')) {
			return filteringRegex
				? indexes.filter(index => index.match(filteringRegex))
				: indexes;
		}

		await Promise.allSettled(
			indexes.map(async index => {
				allResults.push(...(await getSitemapEntries(index, filteringRegex)));
			})
		);

		return allResults;
	} catch (error) {
		throw new Error(
			`fetching sitemap.xml from ${url} failed: ${
				(error as AxiosError).message ?? error
			}`
		);
	}
};
