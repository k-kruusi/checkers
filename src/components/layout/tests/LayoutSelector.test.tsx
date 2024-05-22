import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveProvider } from '../../../providers';
import { LayoutSelector } from '../LayoutSelector';

describe('LayoutSelector', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveProvider>
          <LayoutSelector>
            <div>gameboard</div>
          </LayoutSelector>
        </NextMoveProvider>
      </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});