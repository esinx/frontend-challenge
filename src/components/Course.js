import React from "react";
import styles from "./course.module.scss";
import * as states from "#store/atoms";
import * as selectors from "#store/selectors";
import { useRecoilState, useRecoilValue } from "recoil";

export default ({ course, onInfoAction, showButtons = true }) => {
	const { dept, number, title, prereqs } = course;

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

	return (
		<div
			className={`${styles.course} ${inCart ? styles.inCart : ""} ${
				inCart ? styles.expand : ""
			}`}>
			<div className={styles.info}>
				<div className={styles.number}>
					{dept}
					{number}
				</div>
				<div className={styles.title}>{title}</div>
			</div>
			{!!prereqs && !!prereqs.length && (
				<div className={styles.prereqs}>
					{(Array.isArray(prereqs) ? prereqs : [prereqs]).map((prereq, i) => (
						<div key={String(i)} className={styles.prereq}>
							{prereq}
						</div>
					))}
				</div>
			)}
			{showButtons && (
				<div className={styles.buttons}>
					<div
						className={`${styles.button} ${styles.info}`}
						onClick={() => {
							onInfoAction && onInfoAction(course);
						}}>
						More info...
					</div>
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
								<svg
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M.021.644L.979.356 1.472 2H12.5A2.5 2.5 0 0115 4.5V11H3.128L.02.644zM6 7h5V6H6v1zm-2 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1zm5.5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1z"
										fill="currentColor"></path>
								</svg>
							) : (
								<svg
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M.021.644L.979.356 1.472 2H12.5A2.5 2.5 0 0115 4.5V11H3.128L.02.644zM8 9V7H6V6h2V4h1v2h2v1H9v2H8zm-4 4.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1zm5.5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5-.5a.5.5 0 100 1 .5.5 0 000-1z"
										fill="currentColor"></path>
								</svg>
							)}
						</div>
						<div className={styles.text}>
							{inCart ? "Remove from cart" : "Add to cart"}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
