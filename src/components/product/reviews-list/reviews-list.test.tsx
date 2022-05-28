import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeReviews } from '../../../utils/mocks/mocks';
import ReviewsList from './reviews-list';

describe('Component: Reviews List', () => {
  it('should render correctly', () => {
    const reviews = makeFakeReviews(10);
    const id = 3;
    const guitarName = 'mocksGuitar';

    render(
      <BrowserRouter>
        <ReviewsList reviews={reviews} guitarName={guitarName} id={id} />
      </BrowserRouter>,
    );

    const reviewsListElement = screen.getByText('Отзывы');

    expect(reviewsListElement).toBeInTheDocument();
  });
});
