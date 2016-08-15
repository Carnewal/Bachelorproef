import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'

import keymiddleware from './middleware/keymiddleware'
import reducers from './reducers'
import SimpleContainer from './containers/SimpleContainer'

const store = createStore(reducers, 


	compose(
	typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
	)
);



ReactDOM.render(
	<Provider store={store}>
		<SimpleContainer/>
	</Provider>
, document.getElementById('root'));