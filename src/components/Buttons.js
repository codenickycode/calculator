import React from 'react';
import { buttonProps } from './buttonProps.js';
import { connect } from 'react-redux';
import { actionInput } from '../redux/actions.js';
import { store } from '../index.js';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    store.dispatch(actionInput(this.props.input));
  }

  render() {
    // console.log(`rendering <Button ${this.props.id}/>`);
    return (
      <div
        id={this.props.id}
        className={this.props.class}
        onClick={this.handleClick}
      >
        {this.props.svg}
      </div>
    );
  }
}

const buttonState = (state) => ({
  decimal: state.inputReducer.decimal,
});
// const buttonDispatch = (dispatch, ownProps) => {
//   return {
//     actionInput: () => dispatch(actionInput(ownProps.input)),
//   };
// };
const ButtonContainer = connect(buttonState)(Button);

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('rendering <buttons/>');
    const buttons = buttonProps.map((b) => (
      <ButtonContainer
        key={b.id}
        id={b.id}
        class={b.class}
        input={b.input}
        label={b.label}
        svg={b.svg}
      />
    ));
    return <div id='grid'>{buttons}</div>;
  }
}

export default Buttons;
