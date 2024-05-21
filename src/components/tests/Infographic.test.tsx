import { render } from '@testing-library/react';
import { InfoGraphic } from '../Infographic';
import { Piece } from '../../schema';
import { CheckersProvider } from '../../providers';

test('InfoGraphic component snapshot', () => {
  const { asFragment } = render(
    <CheckersProvider>
      <InfoGraphic piece={Piece.Black} />
    </CheckersProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});