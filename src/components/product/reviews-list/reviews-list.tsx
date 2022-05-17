import { Review } from '../../../types/review';
import SingleReview from '../single-review/single-review';

type ReviewsProps = {
  reviews: Review[],
  id: number,
}

function Reviews({reviews, id}:ReviewsProps): JSX.Element {

  return(
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="/">Оставить отзыв</a>
      {reviews.slice(0,3).map((item) => (
        <SingleReview review={item} key={item.id}/>
      ))}
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

export default Reviews;
