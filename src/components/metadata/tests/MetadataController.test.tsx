import { render } from '@testing-library/react';
import { CheckersProvider, NextMoveInspectorProvider } from '../../../providers';
import { MetadataController } from '../MetadataController';

describe('MetadataController', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<CheckersProvider>
      <NextMoveInspectorProvider>
        <MetadataController>
          <div>gameboard</div>
        </MetadataController>
      </NextMoveInspectorProvider>
    </CheckersProvider>);

    expect(asFragment()).toMatchSnapshot();
  });
});