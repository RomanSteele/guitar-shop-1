import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ModalWindowSuccess from './modal-window-success';

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
        <ModalWindowSuccess onBackdropClick={mockFunction} />
      </BrowserRouter>,
    );

    const successElement = screen.getByText('Спасибо за ваш отзыв!');

    expect(successElement).toBeInTheDocument();
  });
});
