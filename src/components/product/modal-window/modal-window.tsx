import CSS from 'csstype';
import ReactDom from 'react-dom';
import {ChangeEvent, useCallback, useEffect, useState} from 'react';

type ModalWindowProps = {
  onBackdropClick: () => void,
  guitarName: string,
  isModalVisible: boolean,
}

const MODAL_STYLES: CSS.Properties = {
  position: 'relative',
  width: '550px',
  height: '610px',
  marginBottom: '50px',
  overflow: 'hidden',
};


function ModalWindow({onBackdropClick, isModalVisible, guitarName}:ModalWindowProps): JSX.Element {


  const [validation, setValidation] = useState('');
  const [validationError, setValidationError] = useState(true);


  const nameCheckHandler = (e: ChangeEvent<HTMLInputElement>) =>
  {
    setValidation(e.target.value);
    if(e.target.value.length >= 1 ){
      setValidationError(false);
    }
    else{
      setValidationError(true);
    }
  };


  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      onBackdropClick();
    }
  }, [onBackdropClick]);


  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);


  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isModalVisible]);

  return ReactDom.createPortal(
    <div style={MODAL_STYLES} onClick={ (e) => e.stopPropagation()} >
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div onClick={onBackdropClick} className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
            <form className="form-review">
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input onChange={(e)=>nameCheckHandler(e)} value={validation} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete='off'/>
                  {validationError ? <p className="form-review__warning">Заполните поле</p> : ''}
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5"/>
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4"/>
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3"/>
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2"/>
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1"/>
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    <p className="rate__message">Поставьте оценку</p>
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input className="form-review__input" id="adv" type="text" autoComplete="off"/>
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input className="form-review__input" id="disadv" type="text" autoComplete="off"/>
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="comment" autoComplete="off"></textarea>
              <p className="form-review__warning">Заполните поле</p>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button onClick={onBackdropClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    ,
    document.getElementById('modal-root')as HTMLElement);
}

export default ModalWindow;
