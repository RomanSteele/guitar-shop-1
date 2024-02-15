import ReactDom from 'react-dom';
import CSS from 'csstype';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks-index';
import { changeLoadingStatus, eraseFromCart } from '../../../store/slices/data-slice';
import { GuitarCards } from '../../../types/guitar';
import { guitarStyle } from '../../../utils/utils';
import { useCallback, useEffect } from 'react';
import React from 'react';

    type CartModalWindowProps = {
    onBackdropClick: () => void,
    isModalVisible: boolean,
    card: GuitarCards,
  }

const MODAL_STYLES: CSS.Properties = {
  position: 'relative',
  width: '550px',
  height: '440px',
  marginBottom: '50px',
  overflow: 'hidden',
};

function CartModalDelete({onBackdropClick, isModalVisible, card}:CartModalWindowProps): JSX.Element {

  const { name, previewImg, price, vendorCode, stringCount, type} = card;

  const  loadingStatus  = useAppSelector(({ DATA }) => DATA.loadingStatus );
  const language = useAppSelector(({DATA}) => DATA.language);
  const dispatch = useAppDispatch();


  const refOuter = React.useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = React.useRef<HTMLElement | null>(null);
  const refLastFocusable = React.useRef<HTMLElement | null>(null);

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      onBackdropClick();
    }
  }, [onBackdropClick]);

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

  const handleCartDeleteEscape = () =>{
    onBackdropClick();
    dispatch(changeLoadingStatus(true));
  };

  const handleCartDelete = () =>{
    dispatch(eraseFromCart(card));
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalVisible]);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(
      refOuter.current?.querySelectorAll('[tabindex]') ?? [],
    );

    refFirstFocusable.current = focusableElements[0];
    refLastFocusable.current = focusableElements[focusableElements.length - 1];

    refFirstFocusable.current.focus();
  }, []);


  if (loadingStatus === false) {
    return ReactDom.createPortal(
      <div ref={refOuter} onKeyDown={onKeyDown} style={MODAL_STYLES} onClick={ (e) => e.stopPropagation()} >
        <div className="modal is-active modal-for-ui-kit">
          <div className="modal__wrapper">
            <div onClick={handleCartDeleteEscape} className="modal__overlay" data-close-modal></div>
            <div className="modal__content">
              <h2 className="modal__header title title--medium title--red">{language === 'russian' ?  'Удалить этот товар?' : 'Remove from cart?'}</h2>
              <div className="modal__info"><img className="modal__img" src={`/${previewImg}`} srcSet={`/${previewImg?.slice(0, -4)}@2x.jpg 2x`} width="67" height="137" alt={name}/>
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">{language === 'russian' ?  guitarStyle(type) : type} {name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">{language === 'russian' ?  'Артикул:' : 'Art.'} {vendorCode}</p>
                  <p className="modal__product-params">{language === 'russian' ?  guitarStyle(type) : type.charAt(0).toUpperCase()+type.slice(1)}, {stringCount} {language === 'russian' ?  'струнная:' : 'strings'}</p>
                  <p className="modal__price-wrapper"><span className="modal__price">{language === 'russian' ?  'Цена:' : 'Price:'}</span><span className="modal__price">{price} ₽</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button tabIndex={0} onClick={handleCartDelete} className="button button--small modal__button">{language === 'russian' ?  'Удалить товар' : 'Remove from cart'}</button>
                <button tabIndex={0} onClick={handleCartDeleteEscape} className="button button--black-border button--small modal__button modal__button--right">{language === 'russian' ?  'Продолжить покупки' : 'Continue shopping'}</button>
              </div>
              <button tabIndex={0} onClick={handleCartDeleteEscape} className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      ,
    document.getElementById('modal-root')as HTMLElement);
  }

  return(
    <>
    </>
  );
}

export default CartModalDelete;
