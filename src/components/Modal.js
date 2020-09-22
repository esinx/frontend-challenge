import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group"; // ES6
import "./modal.scss";

export default ({ visible, children, onClose }) => {
	const [_showModal, _setShowModal] = useState(false);
	useEffect(() => {
		document.body.style.overflow = visible ? "hidden" : "unset";
		document.body.style.position = visible ? "fixed" : "unset";
		return () => {
			document.body.style.overflow = "unset";
			document.body.style.position = "unset";
		};
	}, [visible]);
	return (
		// fade
		<CSSTransition
			in={visible}
			timeout={500}
			unmountOnExit={true}
			onEntering={() => {
				_setShowModal(true);
			}}
			classNames="modal-container-transition">
			<div
				className="modal-container"
				onClick={() => {
					_setShowModal(false);
					onClose && onClose();
				}}>
				{/* then move in */}
				<CSSTransition
					in={_showModal}
					timeout={500}
					unmountOnExit={true}
					classNames="modal-transition">
					<div
						className="modal"
						onClick={(event) => {
							event.stopPropagation();
						}}>
						<div className="header">
							<div
								className="close-button"
								onClick={() => {
									_setShowModal(false);
									onClose && onClose();
								}}>
								<svg
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15">
									<path
										d="M1.5 1.5l12 12m-12 0l12-12"
										stroke="currentColor"></path>
								</svg>
							</div>
						</div>
						{children}
					</div>
				</CSSTransition>
			</div>
		</CSSTransition>
	);
};
