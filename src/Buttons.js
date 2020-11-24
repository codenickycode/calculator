import React from 'react';
import Button from './Button.js';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  // send the input up to <Calculator />
  handleClick(input) {
    this.props.click(input);
  }

  render() {
    // console.log('rendering <Buttons/>');

    return (
      <div id='grid'>
        <Button
          id='clear'
          class='btn'
          name='AC'
          input='clear'
          key1='Delete'
          key2='Backspace'
          click={this.props.click}
        />
        <Button
          id='divide'
          class='btn op'
          name='/'
          input='/'
          click={this.props.click}
        />
        <Button
          id='mult'
          class='btn op'
          name='x'
          input='*'
          click={this.props.click}
        />
        <Button
          id='seven'
          class='btn num'
          name='7'
          input='7'
          click={this.props.click}
        />
        <Button
          id='eight'
          class='btn num'
          name='8'
          input='8'
          click={this.props.click}
        />
        <Button
          id='nine'
          class='btn num'
          name='9'
          input='9'
          click={this.props.click}
        />
        <Button
          id='min'
          class='btn op'
          name='-'
          input='-'
          click={this.props.click}
        />
        <Button
          id='four'
          class='btn num'
          name='4'
          input='4'
          click={this.props.click}
        />
        <Button
          id='five'
          class='btn num'
          name='5'
          input='5'
          click={this.props.click}
        />
        <Button
          id='six'
          class='btn num'
          name='6'
          input='6'
          click={this.props.click}
        />
        <Button
          id='plus'
          class='btn op'
          name='+'
          input='+'
          click={this.props.click}
        />
        <Button
          id='one'
          class='btn num'
          name='1'
          input='1'
          click={this.props.click}
        />
        <Button
          id='two'
          class='btn num'
          name='2'
          input='2'
          click={this.props.click}
        />
        <Button
          id='three'
          class='btn num'
          name='3'
          input='3'
          click={this.props.click}
        />
        <Button
          id='eq'
          class='btn'
          name='='
          input='Enter'
          click={this.props.click}
        />
        <Button
          id='zero'
          class='btn num'
          name='0'
          input='0'
          click={this.props.click}
        />
        <Button
          id='dec'
          class='btn num'
          name='.'
          input='.'
          click={this.props.click}
        />
      </div>
    );
  }
}

export default Buttons;
