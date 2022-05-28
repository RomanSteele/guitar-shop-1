import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../../utils/mocks/mocks';
import CardsList from './cards-list';

describe('Component: Cards List', () => {
  it('should render correctly', () => {
    const mockCards = makeFakeGuitars(27);

    render(
      <BrowserRouter>
        <CardsList cards={mockCards} />
      </BrowserRouter>,
    );

    const cardsListElement = screen.getAllByText('Всего оценок:')[0] as HTMLAnchorElement;

    expect(cardsListElement).toBeInTheDocument();

  });
});
