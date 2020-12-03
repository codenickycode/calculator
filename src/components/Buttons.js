import React from 'react';
import { Howl, Howler } from 'howler';
import { isMobile } from 'react-device-detect';
import { buttonProps } from './buttonProps.js';

const hoverHowl = new Howl({
  src: ['./sounds/zapsplat1.mp3'],
  preload: true,
  volume: 0.25,
});
const numHowl = new Howl({
  src: ['./sounds/zapsplat2.mp3'],
  preload: true,
  volume: 1,
});
const opHowl = new Howl({
  src: ['./sounds/zapsplat4.mp3'],
  preload: true,
  volume: 1,
});
const eqHowl = new Howl({
  src: ['./sounds/zapsplat3.mp3'],
  preload: true,
  volume: 1,
});
Howler.volume(0.15);
Howler.mute(false);

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getBtnNode = this.getBtnNode.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  componentDidMount() {
    this.getBtnNode();
    document.addEventListener(this.props.input, this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener(this.props.input, this.handleClick);
  }
  getBtnNode() {
    this.btnNode = document.getElementById(this.props.id);
  }
  handleClick() {
    if (this.btnNode.classList.contains('num')) {
      numHowl.play();
    } else if (this.btnNode.id === 'eq') {
      eqHowl.play();
    } else {
      opHowl.play();
    }
    this.props.click(this.props.input);
    this.btnNode.classList.remove('btnpress');
    void this.btnNode.offsetWidth; //reflow
    this.btnNode.classList.add('btnpress');
  }
  mouseEnter() {
    hoverHowl.play();
    this.btnNode.classList.add('btnhover');
  }
  mouseLeave() {
    this.btnNode.classList.remove('btnhover');
  }

  render() {
    console.log(`rendering <Button ${this.props.id}/>`);
    if (isMobile) {
      return (
        <div
          id={this.props.id}
          className={this.props.class}
          onTouchStart={this.handleClick}
          onTouchEnd={this.handleUp}
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
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
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
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown(e) {
    document.dispatchEvent(new CustomEvent(e.key));
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
