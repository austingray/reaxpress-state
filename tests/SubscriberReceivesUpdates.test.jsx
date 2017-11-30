import React from 'react';
import { mount } from 'enzyme';
import TestComponent from './Components/TestComponent';
import SubscribeComponent from './Components/SubscribeComponent';

test('Test component updated and subscribe component recieves global state change', () => {
  const subscribeComponent = mount(<SubscribeComponent />);
  expect(subscribeComponent.text()).toEqual('no color set');

  const testComponent = mount(<TestComponent />);
  testComponent.find('TestComponent').instance().updateGlobalState('green');
  expect(subscribeComponent.text()).toEqual('green');
});
