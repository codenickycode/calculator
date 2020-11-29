import React from 'react';
import { connect } from 'react-redux';

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('rendering <Display/>');

    let { output } = this.props;
    // chop the leading 0 if it wasn't added explicitly
    if (output.length === 2 && output[0] === 0 && !isNaN(output[1])) {
      output.shift(0);
    }
    output = output.toString();
    output = output.replaceAll(',', ' ');
    return (
      <div id='display' className='display'>
        {/* if new expression, display nothing,
          else display operation or evaluation */}
        <p id='output' className='display'>
          {output.length === 0 ? null : output}
        </p>
      </div>
    );
  }
}

const displayProps = (state) => ({
  output: state.inputReducer.output,
});
export const DisplayContainer = connect(displayProps)(Display);
