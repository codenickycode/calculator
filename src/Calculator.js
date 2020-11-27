import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import inputReducer from './inputReducer';
import { actionInput } from './actions';
import Buttons from './Buttons.js';
import Display from './Display.js';

console.clear();

const rootReducer = combineReducers({
  inputReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const displayProps = (state) => ({
  operationDisplay: state.inputReducer.operationDisplay,
  output: state.inputReducer.output,
});
const DisplayContainer = connect(displayProps)(Display);

const buttonsProps = (state) => ({
  decimal: state.inputReducer.decimal,
});
const buttonsDispatch = { actionInput };
const ButtonsContainer = connect(buttonsProps, buttonsDispatch)(Buttons);

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('rendering <Calculator/>');

    return (
      <Provider store={store}>
        <DisplayContainer />
        <ButtonsContainer />
      </Provider>
    );
  }
}

export default Calculator;
