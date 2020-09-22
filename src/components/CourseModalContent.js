import React, { useEffect, useState } from "react";
import PennLabsAPI from "#utils/pennlabs-api";
import Skeleton from "react-loading-skeleton";
import styles from "./course-modal-content.module.scss";

import * as states from "#store/atoms";
import * as selectors from "#store/selectors";
import { useRecoilState, useRecoilValue } from "recoil";

export default ({ course }) => {
	const { dept, number, title, description } = course;

	const [cart, setCart] = useRecoilState(states.cart);

	const removeFromCart = () => {
		setCart(cart.filter((item) => !(item.dept === dept && item.number === course.number)));
	};
	const addToCart = () => {
		setCart([...cart, course]);
	};
	const inCart = useRecoilValue(
		selectors.cartHas({
			dept,
			number,
		})
	);

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		(async () => {
			try {
				const res = await PennLabsAPI.registrar.search(`${dept}${number}`);
				const lecture = res.courses.find(({ activity }) => activity === "LEC");
				if (!lecture) {
					const error = new Error("Could not load course info");
					error.name = "CourseNotFound";
					throw error;
				}
				setData(lecture);
			} catch (e) {
				console.error(e);
				setError(e);
			}
		})();
	}, []);
	return (
		<div className={styles.courseModalContent}>
			<div className={styles.dept_number}>
				{course.dept}
				{course.number}
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.description}>{description}</div>
			{error && (
				<div className={styles.error}>
					<h3>Oops!</h3>
					<p>
						We could not load the course info for {dept}
						{number}.
					</p>
				</div>
			)}
			{!data && !error && (
				<>
					{Array(3)
						.fill(0)
						.map(() => (
							<div className={styles.skeletons}>
								<h3>
									<Skeleton height={30} width={300} />
								</h3>
								<Skeleton count={4} />
							</div>
						))}
				</>
			)}
			{data && (
				<>
					{data.instructors && !!data.instructors.length && (
						<>
							<h3>Instructors</h3>
							{data.instructors.map(({ name, section_id }) => (
								<div className={styles.instructor}>
									{name} ({section_id})
								</div>
							))}
						</>
					)}
					{data.requirements && !!data.requirements.length && (
						<>
							<h3>Requirements</h3>
							<ul>
								{data.requirements.map(({ requirement_description }, i) => (
									<li key={String(i)}>{requirement_description}</li>
								))}
							</ul>
						</>
					)}
					{data.fulfills_college_requirements &&
						!!data.fulfills_college_requirements.length && (
							<>
								<h3>Fulfilling Requirements</h3>
								<ul>
									{data.fulfills_college_requirements.map((requirement, i) => (
										<li key={String(i)}>{requirement}</li>
									))}
								</ul>
							</>
						)}
					{data.important_notes && !!data.important_notes.length && (
						<>
							<h3>Important Notes</h3>
							<ul>
								{data.important_notes.map((note, i) => (
									<li key={String(i)}>{note}</li>
								))}
							</ul>
						</>
					)}
				</>
			)}
			<div className={styles.buttonWrapper}>
				<div
					className={`${styles.button} ${inCart ? styles.remove : styles.add}`}
					onClick={() => {
						if (inCart) {
							removeFromCart();
						} else {
							addToCart();
						}
					}}>
					<div className={styles.icon}>
						{inCart ? (
							<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M.021.644L.979.356 1.472 2H12.5A2.5 2.5 0 0115 4.5V11H3.128L.02.644zM6 7h5V6H6v1zm-2 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1zm5.5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1z"
									fill="currentColor"></path>
							</svg>
						) : (
							<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M.021.644L.979.356 1.472 2H12.5A2.5 2.5 0 0115 4.5V11H3.128L.02.644zM8 9V7H6V6h2V4h1v2h2v1H9v2H8zm-4 4.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1zm5.5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1z"
									fill="currentColor"></path>
							</svg>
						)}
					</div>
					<div className={styles.text}>{inCart ? "Remove from cart" : "Add to cart"}</div>
				</div>
			</div>
		</div>
	);
};
