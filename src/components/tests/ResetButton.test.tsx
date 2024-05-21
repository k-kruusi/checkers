import { render } from '@testing-library/react';
import { CheckersProvider } from '../../providers';
import { ResetButton } from '../ResetButton';

describe('ResetButton', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<CheckersProvider>
      <ResetButton />
    </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});