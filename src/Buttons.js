import React from 'react';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  // // replace this with global doc listener?????
  // componentDidMount() {
  //   document.addEventListener('keydown', this.keyDown);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.keyDown);
  // }
  // // replace this with global doc listener?????
  // keyDown(e) {
  //   if (
  //     // key1 and key2 to check for clear (Delete, Backspace)
  //     e.key === this.props.key1 ||
  //     e.key === this.props.key2 ||
  //     // all other inputs
  //     e.key === this.props.input
  //   ) {
  //     this.props.actionInput();
  //   }
  // }

  render() {
    // console.log('rendering <buttons/>');
    const actionInput = this.props.actionInput;
    return (
      <div id='grid'>
        <button id='clear' className='btn' key1='Delete' key2='Backspace' onClick={() => actionInput('clear')}>
          AC
        </button>
        <button id='divide' className='btn op' onClick={() => actionInput('/')}>
          /
        </button>
        <button id='mult' className='btn op' onClick={() => actionInput('*')}>
          x
        </button>
        <button id='seven' className='btn num' onClick={() => actionInput('7')}>
          7
        </button>
        <button id='eight' className='btn num' onClick={() => actionInput('8')}>
          8
        </button>
        <button id='nine' className='btn num' onClick={() => actionInput('9')}>
          9
        </button>
        <button id='min' className='btn op' onClick={() => actionInput('-')}>
          -
        </button>
        <button id='four' className='btn num' onClick={() => actionInput('4')}>
          4
        </button>
        <button id='five' className='btn num' onClick={() => actionInput('5')}>
          5
        </button>
        <button id='six' className='btn num' onClick={() => actionInput('6')}>
          6
        </button>
        <button id='plus' className='btn op' onClick={() => actionInput('+')}>
          +
        </button>
        <button id='one' className='btn num' onClick={() => actionInput('1')}>
          1
        </button>
        <button id='two' className='btn num' onClick={() => actionInput('2')}>
          2
        </button>
        <button id='three' className='btn num' onClick={() => actionInput('3')}>
          3
        </button>
        <button id='eq' className='btn' onClick={() => actionInput('Enter')}>
          =
        </button>
        <button id='zero' className='btn num' onClick={() => actionInput('0')}>
          0
        </button>
        <button id='dec' className='btn num' onClick={() => actionInput('.')}>
          .
        </button>
      </div>
    );
  }
}

export default Buttons;
