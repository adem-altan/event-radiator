import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from '../components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';


const store = createStore(rootReducer);
it('navigation component renders without crashing', () => {
    const component = create(<Navigation store={ store }/>);
});