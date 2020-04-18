import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import { GlobalProvider } from './context/GlobalContext'; 
import './App.css';

function App() {
	return (
		<div className="app">
			<GlobalProvider>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/users/:user">
							<User />
						</Route>
					</Switch>
				</Router>
			</GlobalProvider>
		</div>
	);
}

export default App;
