import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveInspectorProvider } from '../../../providers';
import { HorizontalLayout } from '../HorizontalLayout';

describe('HorizontalLayout', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <HorizontalLayout>
            <div>placeholder</div>
          </HorizontalLayout>
        </NextMoveInspectorProvider>
      </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});