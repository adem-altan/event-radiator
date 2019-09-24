import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from '../config/fbConfig'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, 
  compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reduxFirestore(fbConfig),
      reactReduxFirebase(fbConfig)
  )
);

it('app component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={ store }><BrowserRouter><App /></BrowserRouter></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

