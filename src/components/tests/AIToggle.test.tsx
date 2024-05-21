import { render } from '@testing-library/react';
import { CheckersProvider } from '../../providers';
import { AIToggle } from '../AIToggle';

describe('AIToggle', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<CheckersProvider>
      <AIToggle />
    </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});