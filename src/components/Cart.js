import React, { useEffect, useRef } from "react";

import MiniCourse from "#components/MiniCourse";
import styles from "./cart.module.scss";

import { useRecoilValue } from "recoil";
import * as states from "#store/atoms";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./cart-transition.scss";

export default ({ onInfoAction, stickyButton, onCheckout }) => {
	const cart = useRecoilValue(states.cart);
	const coursesEl = useRef(null);

	useEffect(() => {
		if (!stickyButton) {
			coursesEl.current.scrollTop = coursesEl.current.scrollHeight;
		}
	}, [cart, coursesEl]);

	const canCheckout = cart.length > 0 && cart.length <= 7;

	const CheckoutButton = () => (
		<div
			className={`${styles.button} ${canCheckout ? styles.enabled : styles.disabled}`}
			onClick={() => {
				canCheckout && onCheckout && onCheckout(cart);
			}}>
			<div className={styles.icon}>
				<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1 7l4.5 4.5L14 3"
						stroke="currentColor"
						stroke-linecap="square"></path>
				</svg>
			</div>
			<div className={styles.text}>Proceed to Checkout</div>
		</div>
	);
	return (
		<>
			<div className={styles.header}>
				<div className={styles.title}>
					<div className={styles.icon}>
						<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M.979.356L.02.644 3.128 11H15V4.5A2.5 2.5 0 0012.5 2H1.472L.979.356z"
								fill="currentColor"></path>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M5.5 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM5 13.5a.5.5 0 111 0 .5.5 0 01-1 0zm7.5-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-.5 1.5a.5.5 0 111 0 .5.5 0 01-1 0z"
								fill="currentColor"></path>
						</svg>
					</div>
					<h2>Cart</h2>
				</div>
				<div className={styles.badge}>{cart.length}</div>
			</div>
			{!cart.length && <div className={styles.empty}>Your cart is empty!</div>}
			<TransitionGroup
				ref={coursesEl}
				className={`${styles.courses} ${!stickyButton ? styles.scrollable : ""}`}>
				{cart.map((course) => (
					<CSSTransition
						key={`${course.dept}${course.number}`}
						classNames="cart-transition"
						timeout={500}>
						<MiniCourse course={course} onInfoAction={onInfoAction} />
					</CSSTransition>
				))}
			</TransitionGroup>
			{!canCheckout && (
				<div className={styles.warning}>You can only select up to 7 courses</div>
			)}
			{stickyButton ? (
				<div className={styles.buttonWrapper}>
					<CheckoutButton />
				</div>
			) : (
				<CheckoutButton />
			)}
		</>
	);
};
