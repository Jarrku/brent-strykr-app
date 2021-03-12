import React from 'react';
import { render } from '@testing-library/preact';
import { Footer } from '../components/Footer';
import { TrashButton } from '../components/TrashButton';

test('renders deploy link', () => {
  const { getByText } = render(<Footer />);
  const linkElement = getByText(/Brent De Wolf/);
  expect(linkElement).toBeInTheDocument();
});

test('renders button', () => {
  const { getByTitle } = render(<TrashButton />);
  const linkElement = getByTitle('Trash Icon');
  expect(linkElement).toBeInTheDocument();
});
