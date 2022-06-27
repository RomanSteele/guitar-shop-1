import CSS from 'csstype';
import ReactDom from 'react-dom';
import {FormEvent, useCallback, useEffect, useState} from 'react';
import { NewReviewPost } from '../../../types/review';
import  {useInput } from '../../../hooks/use-validation';
import { postReview } from '../../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks-index';
import ModalWindowSuccess from './modal-window-success';
import React from 'react';

type ModalWindowProps = {
  onBackdropClick: () => void,
  guitarName: string,
  isModalVisible: boolean,
  currentId: number,
}

const MODAL_STYLES: CSS.Properties = {
  position: 'relative',
  width: '550px',
  height: '610px',
  marginBottom: '50px',
  overflow: 'hidden',
};

const EMPTY_P_STYLES: CSS.Properties = {
  height: '15px',
  marginTop: '0px',
  marginBottom:'0px',
};


function ModalWindow({onBackdropClick, isModalVisible, guitarName, currentId}:ModalWindowProps): JSX.Element {

  const dispatch = useAppDispatch();

  const  loadingStatus  = useAppSelector(({ DATA }) => DATA.loadingStatus );

  const nameData = useInput('',{isEmpty: true, minLength: 1});
  const advantageData = useInput('',{isEmpty: true, minLength: 1});
  const disadvantageData = useInput('',{isEmpty: true, minLength: 1});
  const reviewData = useInput('',{isEmpty: true, minLength: 1});
  const ratingData = useInput('',{isEmpty: true, minLength: 1});

  const refOuter = React.useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = React.useRef<HTMLElement | null>(null);
  const refLastFocusable = React.useRef<HTMLElement | null>(null);

  const [isValid, setIsValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = () => {
    if(!nameData.isEmpty && !ratingData.isEmpty && !advantageData.isEmpty && !disadvantageData.isEmpty && !reviewData.isEmpty &&
      !nameData.minLengthError && !ratingData.minLengthError && !advantageData.minLengthError && !disadvantageData.minLengthError && !reviewData.minLengthError){
      setIsValid(true);}
    else {
      setIsValid(false);
    }
  };

  const checker = (a:boolean, e:unknown) => {
    if(a){
      return e;
    }
    else{
      return <p style={EMPTY_P_STYLES}> </p>;
    }
  };

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      onBackdropClick();
    }
  }, [onBackdropClick]);


  const sendOnSubmit = ({ guitarId, userName, advantage, disadvantage, comment, rating, createAt, id }: NewReviewPost) => {
    dispatch(postReview({ guitarId, userName, advantage, disadvantage, comment, rating, createAt, id }));

  };


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    sendOnSubmit(
      {
        guitarId: currentId,
        userName: nameData.value,
        advantage: advantageData.value,
        disadvantage: disadvantageData.value,
        comment: reviewData.value,
        rating: Number(ratingData.value),
        createAt: Date(),
        id: (Math.floor(Math.random() * 10000)).toString(),
      });
  };


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


  useEffect(()=>{
    validate();
  });


  if (loadingStatus === false) {
    return ReactDom.createPortal(
      <div ref={refOuter} onKeyDown={onKeyDown} style={MODAL_STYLES} onClick={ (e) => e.stopPropagation()} >
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
                    <input tabIndex={0} onChange={(e) => nameData.onChange(e)} value={nameData.value} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete='off'/>
                    {checker(isFormValid, (nameData.isEmpty || nameData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : <p style={EMPTY_P_STYLES}></p>) }
                  </div>
                  <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                    <div className="rate rate--reverse" >
                      <input tabIndex={0} onChange={(e) => ratingData.onChange(e)} value={5} className="visually-hidden" id="star-5" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={4} className="visually-hidden" id="star-4" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={3} className="visually-hidden" id="star-3" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={2}className="visually-hidden" id="star-2" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input onChange={(e) => ratingData.onChange(e)} value={1}className="visually-hidden" id="star-1" name="rate" type="radio" />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      {checker(isFormValid, (ratingData.isEmpty || ratingData.minLengthError) ?  <p className="rate__message">Поставьте оценку</p> : <p style={EMPTY_P_STYLES}></p>)}
                    </div>
                  </div>
                </div>
                <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
                <input tabIndex={0} onChange={(e) => advantageData.onChange(e)} value = {advantageData.value} className="form-review__input" id="adv" type="text" autoComplete="off"/>
                {checker(isFormValid, (advantageData.isEmpty || advantageData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : <p style={EMPTY_P_STYLES}></p> )}
                <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
                <input tabIndex={0} onChange={(e) => disadvantageData.onChange(e)} value = {disadvantageData.value} className="form-review__input" id="disadv" type="text" autoComplete="off"/>
                {checker(isFormValid, (disadvantageData.isEmpty || disadvantageData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : <p style={EMPTY_P_STYLES}></p> )}
                <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
                <textarea tabIndex={0} onChange={(e) => reviewData.onChange(e)} value = {reviewData.value} className="form-review__input form-review__input--textarea" id="comment" autoComplete="off"></textarea>
                {checker(isFormValid, (reviewData.isEmpty || reviewData.minLengthError) ?  <p className="form-review__warning">Заполните поле</p> : <p style={EMPTY_P_STYLES}></p> )}
                <button onClick={()=>setIsFormValid(true)} tabIndex={0} className="button button--medium-20 form-review__button" type={isValid ? 'submit' : 'button'}>Отправить отзыв</button>
              </form>
              <button tabIndex={0} onClick={onBackdropClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
                <span className="button-cross__icon"></span>
                <span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      ,
    document.getElementById('modal-root')as HTMLElement);
  }

  return(
    <ModalWindowSuccess onBackdropClick={onBackdropClick} />
  );
}


export default ModalWindow;
