import React from 'react';
import { render, cleanup } from '@testing-library/react';

import App from './App';

describe('<App>', () => {
  afterEach(() => {
    cleanup();
  });

  test('Snapshot renders => it should be rendered', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
