import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Cta } from '@/components/Cta';

test('CTA supports the secondary variant', () => {
  render(<Cta href="/contact" variant="secondary">Contact</Cta>);
  const link = screen.getByRole('link', { name: 'Contact' });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/contact');
});
