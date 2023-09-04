import { render, screen } from '@testing-library/react';

import { Rating } from '../Rating';

test('renders Rating component', () => {
  render(<Rating rating={5} onRatingChange={() => {}} />);

  const linkElement = screen.getByTestId('rating');

  // console.log(linkElement.innerHTML);
  expect(linkElement).toBeTruthy();
});
