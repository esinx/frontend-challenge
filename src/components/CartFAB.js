import React from "react";
import { useRecoilValue } from "recoil";
import * as selectors from "#store/selectors";

import styles from "./cart-fab.module.scss";

export default ({ onClick }) => {
	const cartItemCount = useRecoilValue(selectors.cartItemCount);
	return (
		<div className={styles.fab} onClick={onClick}>
			<div className={styles.badge}>{cartItemCount}</div>
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
		</div>
	);
};
