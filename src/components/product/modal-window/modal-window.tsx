import CSS from 'csstype';
import ReactDom from 'react-dom';
import {useCallback, useEffect} from 'react';

import  {useInput } from '../../../hooks/useValidation';

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

  const name = useInput('',{isEmpty: true, minLength: 1});
  const advantages = useInput('',{isEmpty: true, minLength: 1});
  const disadvantages = useInput('',{isEmpty: true, minLength: 1});
  const review = useInput('',{isEmpty: true, minLength: 1});
  const rating = useInput('',{isEmpty: true, minLength: 1});


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
                  <input onChange={(e) => name.onChange(e)} value={name.value} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete='off'/>
                  {(name.isEmpty || name.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse" >
                    <input onChange={(e) => rating.onChange(e)} value={5} className="visually-hidden" id="star-5" name="rate" type="radio" />
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input onChange={(e) => rating.onChange(e)} value={4} className="visually-hidden" id="star-4" name="rate" type="radio" />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input onChange={(e) => rating.onChange(e)} value={3}className="visually-hidden" id="star-3" name="rate" type="radio" />
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input onChange={(e) => rating.onChange(e)} value={2}className="visually-hidden" id="star-2" name="rate" type="radio" />
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input onChange={(e) => rating.onChange(e)} value={1}className="visually-hidden" id="star-1" name="rate" type="radio" />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    {(rating.isEmpty || rating.minLengthError) ?  <p className="rate__message">Поставьте оценку</p> : '' }
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input onChange={(e) => advantages.onChange(e)} value = {advantages.value} className="form-review__input" id="adv" type="text" autoComplete="off"/>
              {(advantages.isEmpty || advantages.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input onChange={(e) => disadvantages.onChange(e)} value = {disadvantages.value} className="form-review__input" id="disadv" type="text" autoComplete="off"/>
              {(disadvantages.isEmpty || disadvantages.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea onChange={(e) => review.onChange(e)} value = {review.value} className="form-review__input form-review__input--textarea" id="comment" autoComplete="off"></textarea>
              {(review.isEmpty || review.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
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
