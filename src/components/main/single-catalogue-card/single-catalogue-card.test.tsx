import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { makeFakeGuitars } from '../../../utils/mocks/mocks';
import SingleCatalogueCard from './single-catalogue-card';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';


describe('Component: Single Catalogue Card', () => {
  it('should render correctly', () => {
    const singleCard = makeFakeGuitars(3)[0];
    const guitars = makeFakeGuitars(27);
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({
      DATA: {
        guitars: guitars,
        cartGuitars: guitars,
      },
    });


    render(
      <BrowserRouter>
        <Provider store= {store}>
          <SingleCatalogueCard card={singleCard} />
        </Provider>
      </BrowserRouter>,
    );

    const singleCardElement = screen.getByText('Всего оценок:');

    expect(singleCardElement).toBeInTheDocument();
  });
});
