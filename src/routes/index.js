import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import HomePage from '../pages/HomePage';
import NewsPage from '../pages/NewsPage';

const history = createBrowserHistory()

export default() => (
	<Router history={ history }>
		<Switch>
			<Route path="/" exact component={ HomePage }></Route>
			<Route path="/news" exact component= { NewsPage }></Route>
		</Switch >
	</Router>
);