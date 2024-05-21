import { render } from '@testing-library/react';
import { InfoGraphic } from '../../Infographic';
import { Piece } from '../../../schema';

test('InfoGraphic component snapshot', () => {
  const { asFragment } = render(
    <InfoGraphic piece={Piece.Black} />
  );
  expect(asFragment()).toMatchSnapshot();
});