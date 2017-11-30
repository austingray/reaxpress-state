import React from 'react';
import ReaxpressState from '../../src/index';

@ReaxpressState
class TestComponent extends React.Component {
  render() {
    return (
      <div>{this.props.state.color || 'no color set'}</div>
    );
  }
}

export default TestComponent;
