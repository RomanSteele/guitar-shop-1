import { Review } from '../../../types/review';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

type SingleReviewProps = {
  review: Review,
}

const RATING_STARS=[
  1,2,3,4,5,
];

function SingleReview({review}:SingleReviewProps): JSX.Element {

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
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default SingleReview;
