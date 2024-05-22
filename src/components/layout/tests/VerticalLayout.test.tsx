import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveProvider } from '../../../providers';
import { VerticalLayout } from '../VerticalLayout';

describe('HorizontalLayout', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <CheckersProvider>
        <NextMoveProvider>
          <VerticalLayout>
            <div>placeholder</div>
          </VerticalLayout>
        </NextMoveProvider>
      </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});