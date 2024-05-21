import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveInspectorProvider } from '../../../providers';
import { VerticalLayout } from '../VerticalLayout';

describe('HorizontalLayout', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <VerticalLayout>
            <div>placeholder</div>
          </VerticalLayout>
        </NextMoveInspectorProvider>
      </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});