import React from 'react';
import ReactDOM from 'react-dom';
import AddEvent from '../components/AddAnEv';
import { createStore } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import { Provider } from 'react-redux';


const store = createStore(rootReducer);
it('addEvent component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={ store }><AddEvent /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});