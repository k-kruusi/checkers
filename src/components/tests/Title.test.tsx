import { render } from '@testing-library/react';
import { Title } from '../Title';

describe('Title', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Title />);

    expect(asFragment()).toMatchSnapshot();
  });
});