import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartModalWindowSuccess from './cart-modal-window-succcess';

describe('Component: Modal Window Success', () => {


  it('should render correctly', () => {
    const mockFunction = () => null;
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    // eslint-disable-next-line testing-library/no-node-access
    const body = global.document.querySelector('body') as HTMLBodyElement ;
    body.appendChild(modalRoot);

    render(
      <BrowserRouter>
        <CartModalWindowSuccess onBackdropClick={mockFunction} />
      </BrowserRouter>,
    );

    const successElement = screen.getByText('Товар успешно добавлен в корзину');

    expect(successElement).toBeInTheDocument();
  });
});
