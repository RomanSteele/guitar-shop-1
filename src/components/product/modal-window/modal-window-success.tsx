import CSS from 'csstype';
import ReactDom from 'react-dom';


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

  return ReactDom.createPortal(
    <div style={MODAL_STYLES} onClick={ (e) => e.stopPropagation()} >
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div onClick={onBackdropClick} className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button onClick={onBackdropClick} className="button button--small modal__button modal__button--review">К покупкам!</button>
            </div>
            <button onClick={onBackdropClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    ,document.getElementById('modal-root')as HTMLElement);
}

export default ModalWindowSuccess;
