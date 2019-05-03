import React from 'react';
import ReactDOM from 'react-dom';
import Event from '../components/Event';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);
const event = {
    name: 'test event',
    id: 'test id',
    date: 'test date',
    time: 'test time',
    location: 'test location'
}

it('event component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={ store }><BrowserRouter><Event event={ event }/></BrowserRouter></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});