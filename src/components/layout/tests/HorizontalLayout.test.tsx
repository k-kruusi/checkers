import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveProvider } from '../../../providers';
import { HorizontalLayout } from '../HorizontalLayout';

describe('HorizontalLayout', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveProvider>
          <HorizontalLayout>
            <div>placeholder</div>
          </HorizontalLayout>
        </NextMoveProvider>
      </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});