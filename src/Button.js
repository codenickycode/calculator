import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.keyDown = this.keyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // add event listeners for keydown
  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }
  // send the input up to <Calculator />(...passing through <Buttons />)
  handleClick() {
    this.props.click(this.props.input);
  }
  // if any keydown matches this input, send it up
  keyDown(e) {
    if (
      // key1 and key2 to check for clear (Delete, Backspace)
      e.key === this.props.key1 ||
      e.key === this.props.key2 ||
      // all other inputs
      e.key === this.props.input
    ) {
      this.handleClick();
    }
  }

  render() {
    return (
      <button id={this.props.id} className={this.props.class} type='button' onClick={() => this.handleClick(this.props.input)}>
        {this.props.name}
      </button>
    );
  }
}

export default Button;
