import React from 'react';
import { buttonsArray } from './buttonsArray.js';
import { connect } from 'react-redux';
import { actionInput } from '../redux/actions.js';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(`rendering <Button ${this.props.id}/>`);
    return (
      <button
        id={this.props.id}
        className={this.props.class}
        onClick={() => this.props.actionInput()}
      >
        {this.props.label}
      </button>
    );
  }
}

const buttonState = (state) => ({
  decimal: state.inputReducer.decimal,
});
const buttonDispatch = (dispatch, ownProps) => {
  return {
    actionInput: () => dispatch(actionInput(ownProps.input)),
  };
};
const ButtonContainer = connect(buttonState, buttonDispatch)(Button);

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering <buttons/>');
    const buttons = buttonsArray.map((b) => (
      <ButtonContainer
        key={b.id}
        id={b.id}
        class={b.class}
        input={b.input}
        label={b.label}
      />
    ));
    return <div id='grid'>{buttons}</div>;
  }
}

export default Buttons;
