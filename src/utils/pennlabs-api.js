const BASE_URL = `https://api.pennlabs.org`;

export default {
	registrar: {
		search: async (query) => {
			const params = new URLSearchParams({ q: query });
			const res = await fetch(`${BASE_URL}/registrar/search?${params}`);
			return await res.json();
		},
	},
};
