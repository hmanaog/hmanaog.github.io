import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import ListItems from './ListItems/ListItems';
import Article from './Article/Article';

import { Container } from '@material-ui/core';

function App() {
	return (
		<div className='App'>
			<Header />

			<Container maxWidth='lg' style={{ padding: '2rem 1rem' }}>
				<Switch>
					<Route exact path={'/'} component={Home} />
					<Route path={'/search/:searchText'} component={ListItems} />
					<Route path={'/article/:articleId'} component={Article} />
				</Switch>
			</Container>
		</div>
	);
}

export default App;
