import React from 'react';
import PropTypes from 'prop-types';
import ReaxpressState from '../../src/index';

@ReaxpressState
class TestComponent extends React.Component {
  updateGlobalState(color) {
    window.__REAXPRESS_STATE__.update({
      color: color,
    });
  }
  render() {
    const color = this.props.state.color || 'no color set';
    return (
      <div>{color}</div>
    );
  }
}

TestComponent.defaultProps = {
  state: {},
};

TestComponent.propTypes = {
  state: PropTypes.shape({
    color: PropTypes.string,
  }),
};

export default TestComponent;
