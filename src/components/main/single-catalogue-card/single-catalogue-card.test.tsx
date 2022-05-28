import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../../utils/mocks/mocks';
import SingleCatalogueCard from './single-catalogue-card';

describe('Component: Single Catalogue Card', () => {
  it('should render correctly', () => {
    const singleCard = makeFakeGuitar();

    render(
      <BrowserRouter>
        <SingleCatalogueCard card={singleCard} />
      </BrowserRouter>,
    );

    const singleCardElement = screen.getByText('Всего оценок:');

    expect(singleCardElement).toBeInTheDocument();
  });
});
