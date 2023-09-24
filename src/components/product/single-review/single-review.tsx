import { Review } from '../../../types/review';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { RATING_STARS } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';

type SingleReviewProps = {
  review: Review,
}

function SingleReview({review}:SingleReviewProps): JSX.Element {

  const language = useAppSelector(({DATA}) => DATA.language);

  const {userName, advantage, disadvantage, comment, rating, createAt} = review;

  return(
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{dayjs(createAt).locale('ru').format('D MMMM')}</span>
      </div>
      <div className="rate review__rating-panel">
        {RATING_STARS.slice(0,rating).map((star) =>
          (
            <svg width="16" height="16" aria-hidden="true" key={star}>
              <use xlinkHref="#icon-full-star"></use>
            </svg>),
        )}
        {RATING_STARS.slice(rating).map((star) =>
          (
            <svg width="16" height="16" aria-hidden="true" key={star}>
              <use xlinkHref="#icon-star"></use>
            </svg>),
        )}
        <p className="visually-hidden">{language === 'russian' ?  'Оценка:' : 'Rating:'} {rating}</p>
      </div>
      <h4 className="review__title title title--lesser">{language === 'russian' ?  'Достоинства:' : 'Advantages:'}</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">{language === 'russian' ?  'Недостатки:' : 'Disadvantages:'}</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">{language === 'russian' ?  'Комментарий:' : 'Comment:'}</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default SingleReview;
