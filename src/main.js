import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import R from 'ramda';

// reducer and store

const initialState = {
    first: '',
    last: ''
};

const reducer = (state, action) => {
    switch (action.type) {
    case 'UPDATE': {
        return R.assoc(action.field, action.value, state);
    }
    default: { return state; }
    }
};

const store = createStore(reducer, initialState);

// form component

const mapStateToProps = ({ first, last }) => ({
    first, last,
    fullname: `${first} ${last}`
});

const mapDispatchToProps = dispacth => ({
    update: field => event => dispacth({type: 'UPDATE', field,
                                        value: event.target.value})
});

class FormClass extends React.Component {
    render () {
        const { first, last, fullname, update } = this.props;
        return (
            <form>
              <fieldset>
                <legend>Personal information:</legend>
                First name:
                <input type="text"
                       onChange={update('first')}
                       value={first}/>
                <br/>
                Last name:
                <input type="text"
                       onChange={update('last')}
                       value={last}/>
                <br/>
                Fullname: {fullname}
              </fieldset>
            </form>
        );
    }
}

const Form = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormClass);


// rendering

ReactDOM.render(
    <Provider store={store}>
      <Form />
    </Provider>,
    document.getElementById('root')
);
