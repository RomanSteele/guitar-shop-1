import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar } from '../../../utils/mocks/mocks';
import DescriptionTab from './characteristics-tab';

describe('Component: Description Tab', () => {
  it('should render correctly', () => {
    const mockGuitar = makeFakeGuitar();

    render(
      <BrowserRouter>
        <DescriptionTab guitar={mockGuitar} />
      </BrowserRouter>,
    );

    const descriptionTabElement = screen.getByText('fakeDescription');

    expect(descriptionTabElement).toBeInTheDocument();
  });
});
