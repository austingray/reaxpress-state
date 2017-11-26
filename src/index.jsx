/* eslint no-underscore-dangle: off, react/no-unused-state: off */
import React from 'react';
import PropTypes from 'prop-types';

function Reaxpress(ReaxpressComponent) {
  class ReaxpressWrapper extends React.Component {
    constructor(props) {
      super(props);

      // need to bind because we pass the function as a variable
      this.onReaxpressStateChange = this.onReaxpressStateChange.bind(this);

      // defaults
      this.mounted = false;
      this.state = {
        state: {},
      };
    }
    getChildContext() {
      if (Object.keys(this.props.state).length === 0 && this.props.state.constructor === Object) {
        return {};
      }
      return { state: this.props.state };
    }
    componentDidMount() {
      this.mounted = true;
      window.reaxpress.addStateSubscriber(this.onReaxpressStateChange);
    }
    componentWillUnmount() {
      this.mounted = false;
    }
    onReaxpressStateChange(state) {
      if (this.mounted) {
        this.setState({
          state,
        });
      }
    }
    render() {
      let state = {};
      if (typeof window === 'undefined') {
        state = typeof this.context.state === 'undefined'
          ? this.props.state
          : this.context.state;
      } else {
        state = window.__REAXPRESS_STATE__; //
      }
      return <ReaxpressComponent {...this.props} state={state} />;
    }
  }
  ReaxpressWrapper.contextTypes = {
    state: PropTypes.object,
  };
  ReaxpressWrapper.childContextTypes = {
    state: PropTypes.object,
  };
  return ReaxpressWrapper;
}

Reaxpress.propTypes = {
  state: PropTypes.shape({}).isRequired,
};

export default Reaxpress;
