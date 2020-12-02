import React from 'react';
import debounce from '../tools/debounce.js';
import { isMobile } from 'react-device-detect';
import { buttonProps } from './buttonProps.js';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getBtnNode = this.getBtnNode.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.getBtnNode();
  }
  getBtnNode() {
    this.btnNode = document.getElementById(this.props.id);
  }
  handleClick() {
    this.props.click(this.props.input);

    let newNode = this.btnNode.cloneNode(true);
    newNode.id = '';
    newNode.className = 'btnpress';
    this.btnNode.appendChild(newNode);
    setTimeout(() => this.btnNode.removeChild(newNode), 150);
  }

  render() {
    // console.log(`rendering <Button ${this.props.id}/>`);
    if (isMobile) {
      return (
        <div
          id={this.props.id}
          className={this.props.class}
          onTouchStart={this.handleClick}
        >
          {this.props.label}
        </div>
      );
    } else {
      return (
        <div
          id={this.props.id}
          className={this.props.class}
          onMouseDown={this.handleClick}
        >
          {this.props.label}
        </div>
      );
    }
  }
}

class Buttons extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.clear();
    // console.log('rendering <buttons/>');
    const buttons = buttonProps.map((b) => (
      <Button
        key={b.id}
        id={b.id}
        class={b.class}
        input={b.input}
        click={this.props.click}
        label={b.label}
        svg={b.svg}
      />
    ));
    return <div id='buttons'>{buttons}</div>;
  }
}

export default Buttons;
