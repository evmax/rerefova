import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import R from 'ramda';
import validate from 'validate.js';

// validation

const nameFormat = {
    pattern: /^[A-Za-z]{2,}$/,
    message: value => `^Name should contain only letters (two or more)!`
};

const constraints = {
    first: {
        presence: {message: '^First name can\'t be empty!'},
        format: nameFormat
    },
    last: {
        format: nameFormat
    },
    age: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 18
        }
    }
};

// reducer and store

const initialState = {
    first: '',
    last: '',
    age: ''
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

const mapStateToProps = ({ first, last, age }) => ({
    first, last, age,
    errors: validate({ first, last, age }, constraints) || {}
});

const mapDispatchToProps = dispacth => ({
    update: field => event => dispacth({type: 'UPDATE', field,
                                        value: event.target.value})
});

const Field = ({params: [label, value, callback, errors]}) => (
    <div>
      {label}:
      <br/>
      <input onChange={callback}
             value={value}
             style={errors.length > 0 ? {color: 'red'} : {}}
             />
      <span style={{color: 'red'}}>
        {errors.join(',')}
      </span>
    </div>
);

class FormClass extends React.Component {
    render () {
        const { first, last, age, errors, update } = this.props;
        return (
            <form>
              <fieldset>
                <legend>Personal information:</legend>

                <Field params={[
                    'First name', first, update('first'), errors.first || []]} />

                <Field params={[
                    'Last name', last, update('last'), errors.last || []]} />

                <Field params={[
                    'Age', age, update('age'), errors.age || []]} />

                Hello, {`${first} ${last} (${age})`}
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
