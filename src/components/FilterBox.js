import React from "react";
import { useRecoilState } from "recoil";
import * as states from "#store/atoms";
import styles from "./filterbox.module.scss";

export default () => {
	const [courseSearch, setCourseSearch] = useRecoilState(states.courseSearch);
	const [sortBy, setSortBy] = useRecoilState(states.courseSortBy);
	const [sortAscending, setSortAscending] = useRecoilState(states.courseSortAscending);
	return (
		<div className={styles.filterBox}>
			<div className={styles.searchBox}>
				<div className={styles.icon}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15">
						<path
							d="M14.5 14.5l-4-4m-4 2a6 6 0 110-12 6 6 0 010 12z"
							stroke="currentColor"></path>
					</svg>
				</div>
				<input
					placeholder="Search here!"
					className={styles.search}
					onChange={(e) => {
						setSortBy("");
						setSortAscending(true);
						setCourseSearch(e.target.value);
					}}
					value={courseSearch}
				/>
			</div>
			<div className={styles.sortBox}>
				<div className={styles.icon}>
					<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M11.5.5h.5a.5.5 0 00-.5-.5v.5zm1 11l.474.158-.474-.158zm.482-1.446l-.474-.158.474.158zM4.5 14.5l-.354.354a.5.5 0 00.708 0L4.5 14.5zM10 1h1.5V0H10v1zm1-.5v6h1v-6h-1zM10 7h3V6h-3v1zm1.862 1H11v1h.862V8zm1.112 3.658l.482-1.446-.948-.316-.482 1.446.948.316zM11 12h1.5v-1H11v1zm.974 2.658l1-3-.948-.316-1 3 .948.316zM9 10a2 2 0 002 2v-1a1 1 0 01-1-1H9zm2-2a2 2 0 00-2 2h1a1 1 0 011-1V8zm.862 1a.68.68 0 01.646.896l.948.316A1.68 1.68 0 0011.862 8v1zm-7.008 5.854l3-3-.708-.708-3 3 .708.708zm0-.708l-3-3-.708.708 3 3 .708-.708zM4 0v14.5h1V0H4z"
							fill="currentColor"></path>
					</svg>
				</div>
				<div>Sort By:</div>
				<div className={styles.sortTags}>
					{[
						{
							display: "Course Number",
							key: "number",
						},
						{
							display: "Title",
							key: "title",
						},
						{
							display: "Prerequisite Count",
							key: "prerequisite-count",
						},
					].map((tag) => (
						<div
							key={tag.key}
							className={`${styles.tag} ${sortBy === tag.key ? styles.active : ""}`}
							onClick={() => {
								setSortBy(tag.key);
								setCourseSearch("");
							}}>
							{tag.display}
						</div>
					))}
				</div>
			</div>
			<div className={styles.ascendingBox}>
				<div
					className={`${styles.ascending} ${sortAscending ? styles.active : ""}`}
					onClick={() => {
						setSortAscending(true);
						setCourseSearch("");
					}}>
					Ascending
				</div>
				<div
					className={`${styles.ascending} ${!sortAscending ? styles.active : ""}`}
					onClick={() => {
						setSortAscending(false);
						setCourseSearch("");
					}}>
					Descending
				</div>
			</div>
		</div>
	);
};
