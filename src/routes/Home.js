import React, { useState } from "react";

import Container from "#components/Container";
import Course from "#components/Course";
import Cart from "#components/Cart";
import CartFAB from "#components/CartFAB";

import FilterBox from "#components/FilterBox";

import Modal from "#components/Modal";
import CourseModalContent from "#components/CourseModalContent";

import { useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import * as selectors from "#store/selectors";

import styles from "./home.module.scss";

export const Home = () => {
	const courses = useRecoilValue(selectors.processedCourses);
	const [showDetailModal, setShowDetailModal] = useState(false);
	const [courseDetail, setCourseDetail] = useState(null);
	const [showCartModal, setShowCartModal] = useState(false);
	const history = useHistory();
	const shouldHideCart = useMediaQuery({ query: "(max-width: 1100px)" });

	const proceedCheckout = (cart) => {
		const encoded = encodeURIComponent(
			btoa(JSON.stringify(cart.map((course) => `${course.dept}${course.number}`)))
		);
		history.push(`/receipt?cart=${encoded}`);
	};

	return (
		<>
			<Container>
				<div className={`${styles.root}`}>
					<div className={styles.courseArea}>
						<FilterBox />
						<div className={styles.courses}>
							{courses.map((course) => (
								<Course
									course={course}
									key={`${course.dept}${course.number}`}
									onInfoAction={(course) => {
										setCourseDetail(course);
										setShowDetailModal(true);
									}}
								/>
							))}
						</div>
					</div>
					{!shouldHideCart && (
						<div className={styles.cartArea}>
							<Cart
								stickyButton={false}
								onInfoAction={(course) => {
									setCourseDetail(course);
									setShowDetailModal(true);
								}}
								onCheckout={proceedCheckout}
							/>
						</div>
					)}
				</div>
			</Container>
			<Modal
				visible={showDetailModal}
				onClose={() => {
					setShowDetailModal(false);
				}}>
				{courseDetail && <CourseModalContent course={courseDetail} />}
			</Modal>
			{shouldHideCart && (
				<Modal
					visible={showCartModal}
					onClose={() => {
						setShowCartModal(false);
					}}>
					<Cart
						stickyButton={true}
						onCheckout={(cart) => {
							setShowCartModal(false);
							proceedCheckout(cart);
						}}
					/>
				</Modal>
			)}
			<div className={styles.fabArea}>
				<CartFAB
					onClick={() => {
						setShowCartModal(true);
					}}
				/>
			</div>
		</>
	);
};
