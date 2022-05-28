import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../../utils/mocks/mocks';
import CharacteristicsTab from './characteristics-tab';

describe('Component: Characteristics tab', () => {
  it('should render correctly', () => {
    const mockGuitar = makeFakeGuitar();

    render(
      <BrowserRouter>
        <CharacteristicsTab guitar={mockGuitar} />
      </BrowserRouter>,
    );

    const characteristicsTabElement = screen.getByText('fakeGuitar');

    expect(characteristicsTabElement).toBeInTheDocument();
  });
});
