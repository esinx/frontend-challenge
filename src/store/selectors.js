import { selector, selectorFamily } from "recoil";
import * as states from "./atoms";
import courses from "#data/courses.json";
import Fuse from "fuse.js";

// cart.length
export const cartItemCount = selector({
	key: "cartItemCount",
	get: ({ get }) => {
		const cart = get(states.cart);
		return cart.length;
	},
});

// helper for cartHas
const compareObj = (like, target) => {
	for (const key of Object.keys(like)) {
		if (!(target[key] && target[key] === like[key])) return false;
	}
	return true;
};

// check if cart has a course with a given dept & number
export const cartHas = selectorFamily({
	key: "cartHas",
	get: (course) => ({ get }) => {
		const cart = get(states.cart);
		return cart.find((item) =>
			compareObj(
				{
					dept: course.dept,
					number: course.number,
				},
				item
			)
		);
	},
});

// courses, after search queries and sorting
export const processedCourses = selector({
	key: "course",
	get: ({ get }) => {
		let _courses = courses;
		const query = get(states.courseSearch);
		const sortBy = get(states.courseSortBy);
		const sortAscending = get(states.courseSortAscending);
		if (query && query.length > 0) {
			const fuse = new Fuse(courses, {
				keys: [
					{
						name: "title",
						weight: 0.4,
					},
					{ name: "number", weight: 0.3 },
					{ name: "description", weight: 0.2 },
					{ name: "prereqs", weight: 0.1 },
				],
			});
			_courses = fuse.search(query).map(({ item }) => item);

			const explicitMatch = query.match(/^CIS(?:[ -_]|)([0-9]{3})$/);
			if (explicitMatch) {
				_courses = [
					_courses.find(({ number }) => number === Number(explicitMatch[1])),
					..._courses.filter(({ number }) => number !== Number(explicitMatch[1])),
				];
			}
		}
		if (sortBy === "prerequisite-count") {
			_courses = [..._courses].sort((a, b) => {
				let areq = a.prereqs ? (Array.isArray(a.prereqs) ? a.prereqs.length : 1) : 0;
				let breq = b.prereqs ? (Array.isArray(b.prereqs) ? b.prereqs.length : 1) : 0;
				return areq - breq;
			});
		}
		if (sortBy === "number") {
			_courses = [..._courses].sort((a, b) => a.number - b.number);
		}
		if (sortBy === "title") {
			_courses = [..._courses].sort((a, b) => a.title.localeCompare(b.title));
		}
		if (!sortAscending) {
			_courses = _courses.reverse();
		}
		return _courses;
	},
});
