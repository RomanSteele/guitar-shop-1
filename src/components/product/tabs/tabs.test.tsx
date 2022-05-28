import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../../utils/mocks/mocks';
import Tabs from './tabs';

describe('Component: Tbas', () => {
  it('should render correctly', () => {
    const mockGuitar = makeFakeGuitar();

    render(
      <BrowserRouter>
        <Tabs guitar={mockGuitar} />
      </BrowserRouter>,
    );

    const descriptionTabElement = screen.getByText('Характеристики');
    const characteristicsTabElement = screen.getByText('Описание');
    expect(characteristicsTabElement).toBeInTheDocument();
    expect(descriptionTabElement).toBeInTheDocument();
  });
});
