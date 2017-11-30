# Reaxpress State

A simple state management library for React.

Example:

```javascript
import React from 'react';
import ReaxpressState from 'reaxpress-state';

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

export default TestComponent
```
