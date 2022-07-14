import { Link } from 'react-router-dom';
import { GuitarCards } from '../../../types/guitar';
import { AppRoute } from '../../../const';
import RatingStars from '../../rating-stars/rating-stars';
import SingleCatalogueCardButton from './single-catalogue-card-button.tsx/single-catalogue-card-button';

type SingleCatalogueCardProps = {
    card: GuitarCards,
}

function SingleCatalogueCard( {card}: SingleCatalogueCardProps): JSX.Element {

  const { id, name, previewImg, price, comments,rating } = card;

  return (
    <div className="product-card">
      <img src={`/${previewImg}`} srcSet={`/${previewImg?.slice(0, -4)}@2x.jpg 2x`} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={rating}/>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{comments.length}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price}
        </p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to={`${AppRoute.GuitarCharacteristics.replace(':id', id.toString())}`}>Подробнее</Link>
        <SingleCatalogueCardButton card={card}/>
      </div>
    </div>
  );
}

export default SingleCatalogueCard;
