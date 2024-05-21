import { render } from '@testing-library/react';
import { GameBoardController } from '../GameBoardController';
import { CheckersProvider, NextMoveInspectorProvider } from '../../../providers';

describe('GameBoardController', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <GameBoardController />
        </NextMoveInspectorProvider>
      </CheckersProvider>);
    expect(asFragment()).toMatchSnapshot();
  });
});