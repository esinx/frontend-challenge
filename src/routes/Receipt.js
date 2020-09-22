import React, { useState } from "react";

import Container from "#components/Container";
import Course from "#components/Course";

import { useURLCart } from "#utils/hooks";
import { useHistory } from "react-router-dom";

import styles from "./receipt.module.scss";

export const Receipt = () => {
	const [copied, setCopied] = useState(null);
	const history = useHistory();
	const cart = useURLCart();

	const backToCart = (cart) => {
		const encoded = encodeURIComponent(
			btoa(JSON.stringify(cart.map((course) => `${course.dept}${course.number}`)))
		);
		history.push(`/?cart=${encoded}`);
	};

	return (
		<Container>
			<div className={styles.title}>Your Receipt</div>
			<h2 className={styles.total}>
				<span className={styles.number}>{cart.length}</span> Courses total
			</h2>
			<div className={styles.layout}>
				<div className={styles.info}>
					<div className={styles.text}>
						Share your receipt with others using this link!
					</div>
					<div
						className={styles.link}
						onClick={async () => {
							try {
								await navigator.clipboard.writeText(window.location.href);
								setCopied("copied");
							} catch (error) {
								console.error(error);
								setCopied("error");
							}
						}}>
						{window.location.href}
					</div>
					{copied === "copied" && (
						<div className={`${styles.copied} ${styles.success}`}>
							Copied to clipboard!
						</div>
					)}
					{copied === "error" && (
						<div className={`${styles.copied} ${styles.error}`}>
							Failed to copy. Please try again manually.
						</div>
					)}
					<div className={styles.text}>Want to make changes? Go back to your cart!</div>
					<div
						className={styles.back}
						onClick={() => {
							backToCart(cart);
						}}>
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
						Back to cart
					</div>
				</div>
				<div className={styles.courses}>
					{cart.map((course) => (
						<Course
							key={`${course.dept}${course.number}`}
							course={course}
							showButtons={false}
						/>
					))}
				</div>
			</div>
		</Container>
	);
};
