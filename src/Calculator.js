import React from 'react';
import Redux from 'redux';
import ReactRedux from 'react-redux';
import inputReducer from './inputReducer';
import Buttons from './Buttons.js';
import Display from './Display.js';

console.clear();

// Redux action types
const INPUT = 'INPUT';
// OUTPUT = 'OUTPUT';

// Redux actions
const actionInput = (input) => {
  return {
    type: INPUT,
    input,
  };
};
// const actionOutput = output => {
//   return {
//     type: OUTPUT,
//     output,
//   }
// }

const rootReducer = Redux.combineReducers({
  input: inputReducer,
  // output: outputReducer,
});

const store = Redux.createStore(rootReducer);

const displayState = (displayState) => {
  return displayState;
};
const buttonsState = (buttonsState) => {
  return buttonsState;
};
const buttonsDispatch = (dispatch) => {
  return {
    click: (input) => {
      dispatch(actionInput(input));
    },
  };
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const DisplayContainer = connect(displayState)(Display);
const ButtonsContainer = connect(buttonsState, buttonsDispatch)(Buttons);

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

// <Display
//           start={this.state.start}
//           newOperand={this.state.newOperand}
//           operating={this.state.operating}
//           operationDisplay={this.state.operationDisplay}
//           output={this.state.output}
//         />
//         <Buttons click={this.buttonClick} />
