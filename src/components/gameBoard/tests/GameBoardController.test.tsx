import { render } from '@testing-library/react';
import { GameBoardController } from '../GameBoardController';
import { CheckersProvider, NextMoveProvider } from '../../../providers';

describe('GameBoardController', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveProvider>
          <GameBoardController />
        </NextMoveProvider>
      </CheckersProvider>);
    expect(asFragment()).toMatchSnapshot();
  });
});