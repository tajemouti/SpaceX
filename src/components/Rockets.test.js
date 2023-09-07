import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Rockets from './Rockets';
import { reserveRocket, cancelReservation } from '../redux/rockets/rocketsSlice';

const mockStore = configureMockStore([thunk]);

describe('Rockets Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      rockets: {
        rockets: [
          {
            id: '5e9d0d95eda69955f709d1eb',
            rocket_name: 'Falcon 1',
            reserved: false,
          },
          {
            id: '5e9d0d95eda69973a809d1ec',
            rocket_name: 'Falcon 9',
            reserved: true,
          },
        ],
        status: 'succeeded',
      },
    });
  });

  test('Renders rockets and Reserve Rocket button', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const rocketNameElement = screen.getByText('Falcon 1');
    const reserveButtonElement = screen.getByText('Reserve Rocket');

    expect(rocketNameElement).toBeInTheDocument();
    expect(reserveButtonElement).toBeInTheDocument();
  });

  test('Clicking Reserve Rocket dispatches reserveRocket action', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const reserveButtonElement = screen.getByText('Reserve Rocket');
    fireEvent.click(reserveButtonElement);

    expect(store.getActions()).toContainEqual(reserveRocket({ id: '5e9d0d95eda69955f709d1eb' }));
  });

  test('Clicking Cancel Reservation dispatches cancelReservation action', async () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const cancelReservationButtonElement = screen.getByText('Cancel Reservation');
    fireEvent.click(cancelReservationButtonElement);

    expect(store.getActions()).toContainEqual(cancelReservation({ id: '5e9d0d95eda69973a809d1ec' }));
  });

  test('Rockets component matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
