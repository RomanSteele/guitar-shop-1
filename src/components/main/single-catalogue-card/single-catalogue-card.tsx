import { Link } from 'react-router-dom';
import { GuitarCards } from '../../../types/guitar';
import { AppRoute } from '../../../const';
import RatingStars from '../../rating-stars/rating-stars';


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
        <Link className="button button--red-border button--mini button--in-cart" to="#">В Корзине</Link>
      </div>
    </div>
  );
}

export default SingleCatalogueCard;


