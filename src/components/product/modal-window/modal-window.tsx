import CSS from 'csstype';
import ReactDom from 'react-dom';
import {FormEvent, useCallback, useEffect} from 'react';
import { ReviewPost } from '../../../types/review';
import  {useInput } from '../../../hooks/use-validation';
import { store } from '../../../store';
import { postReview } from '../../../store/api-actions';
import { fetchReviewsAction } from '../../../store/api-actions';
import { useAppSelector } from '../../../hooks/hooks-index';
import ModalSuccess from './modal-window-success';

type ModalWindowProps = {
  onBackdropClick: () => void,
  guitarName: string,
  isModalVisible: boolean,
  id: number,
}

const MODAL_STYLES: CSS.Properties = {
  position: 'relative',
  width: '550px',
  height: '610px',
  marginBottom: '50px',
  overflow: 'hidden',
};


function ModalWindow({onBackdropClick, isModalVisible, guitarName, id}:ModalWindowProps): JSX.Element {

  const { status } = useAppSelector(( State ) => State );

  const nameData = useInput('',{isEmpty: true, minLength: 1});
  const advantageData = useInput('',{isEmpty: true, minLength: 1});
  const disadvantageData = useInput('',{isEmpty: true, minLength: 1});
  const reviewData = useInput('',{isEmpty: true, minLength: 1});
  const ratingData = useInput('',{isEmpty: true, minLength: 1});

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      onBackdropClick();
    }
  }, [onBackdropClick]);

  const sendOnSubmit = ({ guitarId, userName, advantage, disadvantage, comment, rating }: ReviewPost) => {
    store.dispatch(postReview({ guitarId, userName, advantage, disadvantage, comment, rating }));

  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {

    evt.preventDefault();

    sendOnSubmit(
      {
        guitarId: id,
        userName: nameData.value,
        advantage: advantageData.value,
        disadvantage: disadvantageData.value,
        comment: reviewData.value,
        rating: Number(ratingData.value),
      });
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
      document.body.style.paddingRight = '15px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isModalVisible]);

  useEffect(() => {
    store.dispatch(fetchReviewsAction(id));}, [id, status]);

  if (status === false) {
    return ReactDom.createPortal(
      <div style={MODAL_STYLES} onClick={ (e) => e.stopPropagation()} >
        <div className="modal is-active modal--review modal-for-ui-kit">
          <div className="modal__wrapper">
            <div onClick={onBackdropClick} className="modal__overlay" data-close-modal></div>
            <div className="modal__content">
              <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
              <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
              <form onSubmit={handleSubmit} className="form-review">
                <div className="form-review__wrapper">
                  <div className="form-review__name-wrapper">
                    <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                    <input onChange={(e) => nameData.onChange(e)} value={nameData.value} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete='off'/>
                    {(nameData.isEmpty || nameData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
                  </div>
                  <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                    <div className="rate rate--reverse" >
                      <input onChange={(e) => ratingData.onChange(e)} value={5} className="visually-hidden" id="star-5" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={4} className="visually-hidden" id="star-4" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={3} className="visually-hidden" id="star-3" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={2}className="visually-hidden" id="star-2" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={1}className="visually-hidden" id="star-1" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      {(ratingData.isEmpty || ratingData.minLengthError) ?  <p className="rate__message">Поставьте оценку</p> : '' }
                    </div>
                  </div>
                </div>
                <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
                <input onChange={(e) => advantageData.onChange(e)} value = {advantageData.value} className="form-review__input" id="adv" type="text" autoComplete="off"/>
                {(advantageData.isEmpty || advantageData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
                <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
                <input onChange={(e) => disadvantageData.onChange(e)} value = {disadvantageData.value} className="form-review__input" id="disadv" type="text" autoComplete="off"/>
                {(disadvantageData.isEmpty || disadvantageData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
                <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
                <textarea onChange={(e) => reviewData.onChange(e)} value = {reviewData.value} className="form-review__input form-review__input--textarea" id="comment" autoComplete="off"></textarea>
                {(reviewData.isEmpty || reviewData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : '' }
                <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
              </form>
              <button onClick={onBackdropClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
                <span className="button-cross__icon"></span>
                <span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      ,
    document.getElementById('modal-root')as HTMLElement);
  } else {
    return(
      <ModalSuccess onBackdropClick={onBackdropClick} />
    );
  }
}

export default ModalWindow;
