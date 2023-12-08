import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Home from '../../components/partials/Home.jsx';

describe('Home', () => {
  it('renders Home', () => {
    const { asFragment } = render(<Home />);

    expect(asFragment()).toMatchSnapshot();
  });
});
