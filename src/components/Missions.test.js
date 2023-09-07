import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Missions from './Missions';
import '@testing-library/jest-dom';
import { joinMission } from '../redux/missions/missionsSlice';

const mockMissions = [
  {
    mission_id: '1',
    mission_name: 'Test Mission',
    description: 'Test Description',
    reserved: false,
  },
];

const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('Missions Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: mockMissions,
        status: 'succeeded',
      },
    });
  });

  test('renders missions table correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    expect(getByText('Test Mission')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('Not a Member')).toBeInTheDocument();
    expect(getByText('Join Mission')).toBeInTheDocument();
  });

  test('handle join mission', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    const joinButton = getByText('Join Mission');
    fireEvent.click(joinButton);

    expect(store.getActions()).toContainEqual(joinMission('1'));
  });
  test('Missions matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
