import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeReviews } from '../../../utils/mocks/mocks';
import SingleReview from './single-review';

describe('Component: Single Reveiw', () => {
  it('should render correctly', () => {
    const singleReview = makeFakeReviews(2);
    render(
      <BrowserRouter>
        <SingleReview review={singleReview[0]} />
      </BrowserRouter>,
    );

    const singleReviewElement = screen.getByText('Достоинства:');

    expect(singleReviewElement).toBeInTheDocument();
  });
});
