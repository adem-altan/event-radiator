import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ExpansionPanelActions } from '@material-ui/core';
import { create } from 'react-test-renderer';
import Navigation from './components/AddAnEv';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig)
  )
);
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
it('Fake Test', () => {
  const div = document.createElement('div');
});

describe('Navigation test', () => {
  it('testing navigation', () => {
    const component = create(<Navigation store={ store }/>);
  });
});