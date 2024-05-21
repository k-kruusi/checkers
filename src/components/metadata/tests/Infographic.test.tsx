import { render } from '@testing-library/react';
import { InfoGraphic } from '../Infographic';

test('InfoGraphic component snapshot', () => {
  const { asFragment } = render(
    <InfoGraphic name="Test Name" time="10:00" count={5} myTurn={true} />
  );
  expect(asFragment()).toMatchSnapshot();
});