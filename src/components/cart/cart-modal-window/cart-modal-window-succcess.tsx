import CSS from 'csstype';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';


type ModalSuccessProps = {
  onBackdropClick: () => void,}


const MODAL_STYLES: CSS.Properties = {
  position: 'relative',
  width: '550px',
  height: '410px',
  marginBottom: '50px',
  overflow: 'hidden',
};


function CartModalWindowSuccess({onBackdropClick}:ModalSuccessProps):JSX.Element {

  const isProductPage = window.location.pathname.includes('guitars');
  const language = useAppSelector(({DATA}) => DATA.language);

  const navigate = useNavigate();

  const refOuter = React.useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = React.useRef<HTMLElement | null>(null);
  const refLastFocusable = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(
      refOuter.current?.querySelectorAll('[tabindex]') ?? [],
    );

    refFirstFocusable.current = focusableElements[0];
    refLastFocusable.current = focusableElements[focusableElements.length - 1];

    refFirstFocusable.current.focus();
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (
      document.activeElement === refLastFocusable.current &&
      e.key === 'Tab' &&
      !e.shiftKey
    ) {
      e.preventDefault();
      refFirstFocusable.current?.focus();
    }
    if (
      document.activeElement === refFirstFocusable.current &&
      e.key === 'Tab' &&
      e.shiftKey
    ) {
      e.preventDefault();
      refLastFocusable.current?.focus();
    }
  }, []);

  return ReactDom.createPortal(
    <div ref={refOuter} style={MODAL_STYLES} onKeyDown={onKeyDown} onClick={ (e) => e.stopPropagation()} >
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div onClick={onBackdropClick} className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">{language === 'russian' ?  'Товар успешно добавлен в корзину' : 'Product added to cart successfully'}</p>
            <div className="modal__button-container modal__button-container--add">
              <button tabIndex={0} onClick={()=>navigate(AppRoute.CartPage)} className="button button--small modal__button">{language === 'russian' ?  'Перейти в корзину' : 'Go to cart'}</button>
              {isProductPage ?
                <button tabIndex={0} onClick={()=>navigate(AppRoute.MainFirstPage)} className="button button--black-border button--small modal__button modal__button--right">{language === 'russian' ?  'Продолжить покупки' : 'Continue shopping'}</button>
                :
                <button tabIndex={0} onClick={onBackdropClick} className="button button--black-border button--small modal__button modal__button--right">{language === 'russian' ?  'Продолжить покупки' : 'Continue shopping'}</button>}
            </div>
            <button tabIndex={0} onClick={onBackdropClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    ,document.getElementById('modal-root')as HTMLElement);
}

export default CartModalWindowSuccess;
