import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from '../components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import { Provider } from 'react-redux';


const store = createStore(rootReducer);
it('navigation component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={ store }><BrowserRouter><Navigation /></BrowserRouter></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});