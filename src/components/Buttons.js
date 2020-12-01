import React from 'react';
import { isMobile } from 'react-device-detect';
import { buttonProps } from './buttonProps.js';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(`rendering <Button ${this.props.id}/>`);
    if (isMobile) {
      return (
        <div
          id={this.props.id}
          className={this.props.class}
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
