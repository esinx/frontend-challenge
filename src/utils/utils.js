import courses from "#data/courses.json";

export const getCartFromLocation = (location) => {
	try {
		const query = new URLSearchParams(location.search);
		const cartQuery = query.get("cart");
		const decodedQuery = decodeURIComponent(cartQuery);
		const decodedBase64 = atob(decodedQuery);
		const cart = JSON.parse(decodedBase64);
		// find corresponding course
		const mapped = cart.map((courseID) =>
			courses.find(({ number }) => number === Number(courseID.match(/^CIS([0-9]{3})$/)[1]))
		);
		// remove undefined / not resolved errors
		return mapped.filter((c) => !!c);
	} catch (error) {
		console.error(error);
		return [];
	}
};
