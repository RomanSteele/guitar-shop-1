import { RATING_STARS } from '../../const';

type RatingStartsProps={
    rating: number
};

function RatingStars( {rating}: RatingStartsProps): JSX.Element {
  return(
    <>
      {RATING_STARS.map((rate) => (
        <svg key={rate} width="12" height="11" aria-hidden="true">
          <use xlinkHref={`#icon${rating >= rate ? '-full' : ''}-star`} />
        </svg>
      ))}
    </>
  );
}

export default RatingStars;
