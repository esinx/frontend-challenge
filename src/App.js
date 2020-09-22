import React from "react";
import { Route, Switch, BrowserRouter as Router, useLocation } from "react-router-dom";
import * as routes from "#routes";

import Nav from "#components/Nav";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./route-transition.scss";

const Content = () => {
	let location = useLocation();
	console.log(location);
	return (
		<TransitionGroup>
			<CSSTransition key={location.key} classNames="route-transition" timeout={500}>
				<Switch location={location}>
					<Route exact path="/" component={routes.Home} />
					<Route exact path="/receipt" component={routes.Receipt} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
	);
};

export default () => {
	return (
		<Router>
			<Nav />
			<Content />
		</Router>
	);
};
