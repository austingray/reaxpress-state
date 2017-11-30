import React from 'react';
import renderer from 'react-test-renderer';
import TestComponent from './Components/TestComponent';

test('Decorator works', () => {
  const testComponent = renderer.create(<TestComponent />);
  const tree = testComponent.toJSON();
  expect(tree).toMatchSnapshot();
});
