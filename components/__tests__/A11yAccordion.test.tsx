import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { A11yAccordion } from '../A11yAccordion';

test('announces state and toggles with keyboard', async () => {
  const u = user.setup();
  render(<A11yAccordion title="Details"><p>Content</p></A11yAccordion>);

  const button = screen.getByRole('button', { name: /details/i });
  expect(button).toHaveAttribute('aria-expanded', 'false');

  await u.tab();
  expect(button).toHaveFocus();

  await u.keyboard('{Enter}');
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const region = screen.getByRole('region', { name: /details/i });
  expect(region).toBeVisible();
});
