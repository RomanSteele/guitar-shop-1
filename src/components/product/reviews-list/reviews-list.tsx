import { Review } from '../../../types/review';
import SingleReview from '../single-review/single-review';
import { useState, useEffect } from 'react';
import ModalWindowWrapper from '../modal-window/modal-window-wrapper';

const REVIEWS_PER_STEP = 3;

type ReviewsProps = {
  reviews: Review[],
  guitarName: string,
}

function ReviewsList({reviews, guitarName}:ReviewsProps): JSX.Element {

  const [step, setStep] = useState(REVIEWS_PER_STEP);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setStep(REVIEWS_PER_STEP);
  }, []);

  const handleShowMoreButtonClick = () => {
    setStep(step + REVIEWS_PER_STEP);
  };

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  return(
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button onClick={toggleModal} className="button button--red-border button--big reviews__sumbit-button" >Оставить отзыв</button>
      <ModalWindowWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} guitarName={guitarName}/>
      {reviews.slice(0, step).map((item) => (
        <SingleReview review={item} key={item.id}/>
      ))}
      {(reviews.length > step)
      &&
      <button onClick={handleShowMoreButtonClick} className="button button--medium reviews__more-button">Показать еще отзывы</button>}

      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

export default ReviewsList;
