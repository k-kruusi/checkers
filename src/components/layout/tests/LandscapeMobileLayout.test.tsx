import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveInspectorProvider } from '../../../providers';
import { LandscapeMobileLayout } from '../LandscapeMobileLayout';

describe('HorizontalLayout', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <LandscapeMobileLayout>
            <div>placeholder</div>
          </LandscapeMobileLayout>
        </NextMoveInspectorProvider>
      </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});