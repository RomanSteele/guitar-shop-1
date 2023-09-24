import CSS from 'csstype';
import React, { useEffect, useCallback } from 'react';
import ReactDom from 'react-dom';
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


function ModalWindowSuccess({onBackdropClick}:ModalSuccessProps):JSX.Element {

  const language = useAppSelector(({DATA}) => DATA.language);

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
    <div ref={refOuter} onKeyDown={onKeyDown} style={MODAL_STYLES} onClick={ (e) => e.stopPropagation()} >
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div onClick={onBackdropClick} className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">{language === 'russian' ?  'Спасибо за ваш отзыв!' : 'Thanks for your feedback!'}</p>
            <div className="modal__button-container modal__button-container--review">
              <button tabIndex={0} onClick={onBackdropClick} className="button button--small modal__button modal__button--review">{language === 'russian' ?  'К покупкам!' : 'Go shopping!'}</button>
            </div>
            <button tabIndex={0} onClick={onBackdropClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    ,document.getElementById('modal-root')as HTMLElement);
}

export default ModalWindowSuccess;
