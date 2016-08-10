import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

const reducer = (state, action) => {
    return state;
};

const store = createStore(reducer, {});

ReactDOM.render(
    <Provider store={store}>
      <div>Hello world!</div>
    </Provider>,
    document.getElementById('root')
);
