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
import MyProfilePage from '../pages/MyProfilePage';
import ProfilePage from '../pages/ProfilePage';
import LooksPage from '../pages/LooksPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import SettingsPage from '../pages/SettingsPage';
import SearchResultsPage from '../pages/SearchResultsPage';

const history = createBrowserHistory()
const checkAuth = () => {
	const sessionID = localStorage.getItem('sessionID')
	if (!sessionID) {
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
      <Route exact path="/looks" component={ LooksPage }></Route>
      <Route exact path="/resetpassword" component={ ResetPasswordPage }></Route>
      <AuthRoute exact path="/settings" component={SettingsPage} />
			<AuthRoute exact path="/news" component={ NewsPage } />
      <AuthRoute exact path="/myprofile" component={ MyProfilePage } />
      <AuthRoute exact path="/profile" component={ ProfilePage } />
      <AuthRoute exact path="/searchresults" component={ SearchResultsPage } />
		</Switch >
	</Router>
);