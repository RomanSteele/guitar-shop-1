import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const footerElement = screen.getByText('г. Санкт-Петербург, м. Невский проспект, ул. Казанская 6.');

    expect(footerElement).toBeInTheDocument();
  });
});
