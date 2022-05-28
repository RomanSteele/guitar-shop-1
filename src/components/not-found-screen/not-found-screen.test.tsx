import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundScreen from './not-found-screen';


describe('Component: Not Found Screen', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <NotFoundScreen />
      </BrowserRouter>,
    );

    const notFoundScreenElement = screen.getByText('404 - Not Found!');

    expect(notFoundScreenElement).toBeInTheDocument();
  });
});
