import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitar, makeFakeGuitars } from '../../../../utils/mocks/mocks';
import SingleCatalogueCardButton from './single-catalogue-card-button';

const mockStore = configureMockStore();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const guitars = makeFakeGuitars(27);
    const guitar = makeFakeGuitar();

    render(
      <BrowserRouter>
        <Provider store={mockStore({
          DATA: {
            guitars: guitars,
            cartGuitars: guitars,
          },
        })}
        >
          <SingleCatalogueCardButton card={guitar} />
        </Provider>,
      </BrowserRouter>,
    );

    const buttonElement = screen.getByText('Купить');

    expect(buttonElement).toBeInTheDocument();
  });
});
