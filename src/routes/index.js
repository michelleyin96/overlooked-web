import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import HomePage from '../pages/HomePage';
import NewsPage from '../pages/NewsPage';

const history = createBrowserHistory()
const checkAuth = () => {
	const authToken = localStorage.getItem('authToken')
	if (!authToken) {
		return false;
	}
	return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/' }} />
      )
  )} />
)

export default() => (
	<Router history={ history }>
		<Switch>
			<Route path="/" exact component={ HomePage }></Route>
			<AuthRoute exact path="/news" component= { NewsPage } />
		</Switch >
	</Router>
);