import React from 'react';
import PropTypes from 'prop-types';
import ReaxpressState from '../../src/index';

@ReaxpressState
class TestComponent extends React.Component {
  render() {
    return (
      <div>{this.props.state.color || 'no color set'}</div>
    );
  }
}

TestComponent.propTypes = {
  state: PropTypes.shape({
    color: PropTypes.string,
  }).isRequired,
};

export default TestComponent;
