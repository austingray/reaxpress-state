import React from 'react';
import PropTypes from 'prop-types';

function ReaxpressState(ReaxpressComponent) {
  class ReaxpressWrapper extends React.Component {
    constructor(props) {
      super(props);

      // need to bind because we pass the function as a variable
      this.onReaxpressStateChange = this.onReaxpressStateChange.bind(this);

      // defaults
      this.mounted = false;

      // if __REAXPRESS__STATE__ has not been defined yet
      if (typeof window !== 'undefined' && typeof window.__REAXPRESS_STATE__ === 'undefined') {
        // add __REAXPRESS__STATE__ to the global scope
        window.__REAXPRESS_STATE__ = {};

        // this component pushes state change functions
        // to stateSubscribers[] via addStateSubscriber();
        window.__REAXPRESS_STATE__.stateSubscribers = [];
        window.__REAXPRESS_STATE__.addStateSubscriber = (method) => {
          window.__REAXPRESS_STATE__.stateSubscribers.push(method);
        };

        // update the state
        window.__REAXPRESS_STATE__.update = (newState) => {
          // create an updated state from the new state passed to the update method
          const updatedState = Object.assign({}, window.__REAXPRESS_STATE__.state, newState);
          // assign the updated state to the global state
          window.__REAXPRESS_STATE__.state = updatedState;
          // notify the state subscribers
          for (let i = 0; i < window.__REAXPRESS_STATE__.stateSubscribers.length; i += 1) {
            window.__REAXPRESS_STATE__.stateSubscribers[i](updatedState);
          }
        };
      }
    }
    getChildContext() {
      if (
        (this.props.state && Object.keys(this.props.state).length === 0)
        && this.props.state.constructor === Object
      ) {
        return {};
      }
      return { state: this.props.state };
    }
    componentDidMount() {
      // the component has mounted
      this.mounted = true;

      // bail if this is happening server side
      if (typeof window === 'undefined') {
        return;
      }

      // add state subscriber
      window.__REAXPRESS_STATE__.addStateSubscriber(this.onReaxpressStateChange);
    }
    componentWillUnmount() {
      // unmounted
      this.mounted = false;
    }
    onReaxpressStateChange(state) {
      // sets the global state to the component local state
      // local state will get passed as a state prop to the
      // wrapped component
      if (this.mounted) {
        this.setState({
          state,
        });
      }
    }
    render() {
      // start with an empty state object
      let state = {};

      // server side handling
      if (typeof window === 'undefined') {
        // use context or props to grab state when server side
        state = typeof this.context.state === 'undefined'
          ? this.props.state
          : this.context.state;
      } else if (window.__REAXPRESS_STATE__ !== 'undefined') {
        state = window.__REAXPRESS_STATE__.state || {}; // eslint-disable-line prefer-destructuring
      }
      return <ReaxpressComponent {...this.props} state={state} />;
    }
  }

  ReaxpressWrapper.defaultProps = {
    state: {},
  };

  ReaxpressWrapper.propTypes = {
    state: PropTypes.node,
  };

  ReaxpressWrapper.contextTypes = {
    state: PropTypes.object,
  };

  ReaxpressWrapper.childContextTypes = {
    state: PropTypes.object,
  };

  return ReaxpressWrapper;
}

export default ReaxpressState;
