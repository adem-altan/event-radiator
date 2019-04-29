import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays something', () => {
  const div = document.createElement('div');
  events = createDummyEvents();
  ReactDOM.render(<App events={events} />, div);

  ReactDOM.unmountComponentAtNode(div);
});

const createDummyEvents = () => {
  //return true;
}
