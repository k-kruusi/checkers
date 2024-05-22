import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveProvider } from '../../../providers';
import { LandscapeMobileLayout } from '../LandscapeMobileLayout';

describe('HorizontalLayout', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveProvider>
          <LandscapeMobileLayout>
            <div>placeholder</div>
          </LandscapeMobileLayout>
        </NextMoveProvider>
      </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});