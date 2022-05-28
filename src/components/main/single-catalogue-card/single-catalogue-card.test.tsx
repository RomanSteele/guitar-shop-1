import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../../utils/mocks/mocks';
import SingleCatalogueCard from './single-catalogue-card';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const singleCard = makeFakeGuitar();

    render(
      <BrowserRouter>
        <SingleCatalogueCard card={singleCard} />
      </BrowserRouter>,
    );

    const footerElement = screen.getByText('Всего оценок:');

    expect(footerElement).toBeInTheDocument();
  });
});
