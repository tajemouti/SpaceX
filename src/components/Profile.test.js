import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Profile from './Profile';
import '@testing-library/jest-dom/extend-expect';

// Setting up mock store
const mockStore = configureMockStore();

// Mock state data
const mockState = {
  missions: {
    missions: [
      {
        mission_id: '1',
        mission_name: 'Sample Mission',
        reserved: true,
      },
    ],
  },
  rockets: {
    rockets: [
      {
        id: '1',
        rocket_name: 'Sample Rocket',
        reserved: true,
      },
    ],
  },
};

describe('Profile Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(mockState);
  });

  // Snapshot Test
  test('Profile matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
