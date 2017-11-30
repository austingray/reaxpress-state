import React from 'react';
import { mount } from 'enzyme';
import TestComponent from './Components/TestComponent';

test('Test component updates and receives global state', () => {
  // get the default state
  const testComponent = mount(<TestComponent />);
  expect(testComponent.text()).toEqual('no color set');

  // updated color
  testComponent.find('TestComponent').instance().updateGlobalState('green');
  expect(testComponent.text()).toEqual('green');
});
