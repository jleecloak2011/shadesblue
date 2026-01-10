import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Minimal component inline for a smoke test, or import your page component if it's simple.
function Heading() {
  return <h1>Senior Front-End Developer & Web Engineer</h1>;
}

test('shows homepage heading', () => {
  render(<Heading />);
  expect(screen.getByRole('heading', { name: /senior front-end developer/i })).toBeInTheDocument();
});
