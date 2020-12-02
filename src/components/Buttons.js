import React from 'react';
import debounce from '../tools/debounce.js';
import { isMobile } from 'react-device-detect';
import { buttonProps } from './buttonProps.js';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.debounce = this.debounce.bind(this);
    this.getRect = this.getRect.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  componentDidMount() {
    this.getRect();
    window.addEventListener('resize', debounce(this.getRect, 150, false, this));
  }
  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      debounce(this.getRect, 150, false, this)
    );
  }
  getRect() {
    this.rect = document.getElementById(this.props.id).getBoundingClientRect();
  }
  mouseEnter(e) {
    console.log(e.clientY, this.rect.top);
  }
  mouseLeave(e) {}

  render() {
    // console.log(`rendering <Button ${this.props.id}/>`);
    if (isMobile) {
      return (
        <div
          id={this.props.id}
          className={this.props.class}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onTouchStart={() => this.props.click(this.props.input)}
        >
          {this.props.label}
        </div>
      );
    } else {
      return (
        <div
          id={this.props.id}
          className={this.props.class}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onClick={() => this.props.click(this.props.input)}
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
