import { atom } from "recoil";
import { getCartFromLocation } from "#utils/utils";

// courses / search / filter / sorting
export const courseSearch = atom({
	key: "courseSearch",
	default: "",
});
export const courseSortBy = atom({
	key: "courseSortBy",
	default: "number",
});
export const courseSortAscending = atom({
	key: "courseSortAscending",
	default: true,
});

// cart
export const cart = atom({
	key: "cart",
	default: window.location ? getCartFromLocation(window.location) : [],
});
