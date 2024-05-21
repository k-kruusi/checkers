import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveInspectorProvider } from '../../../providers';
import { LayoutSelector } from '../LayoutSelector';

describe('LayoutSelector', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<CheckersProvider>
      <NextMoveInspectorProvider>
        <LayoutSelector>
          <div>gameboard</div>
        </LayoutSelector>
      </NextMoveInspectorProvider>
    </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});