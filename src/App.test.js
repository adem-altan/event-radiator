import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ExpansionPanelActions } from '@material-ui/core';
import { create } from 'react-test-renderer';
import Navigation from './components/AddAnEv';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={ [] }/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Fake Test', () => {
  const div = document.createElement('div');
});

describe('Navigation test', () => {
  it('testing navigation', () => {
    const component = create(<Navigation store={ [] }/>);
  });
});