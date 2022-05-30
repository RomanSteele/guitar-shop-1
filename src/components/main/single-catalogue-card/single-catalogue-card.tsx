import { Link } from 'react-router-dom';
import { GuitarCard } from '../../../types/guitar';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks/hooks-index';
import { useEffect, useState } from 'react';
import { fetchReviewsLengthAction } from '../../../store/api-actions';


type SingleCatalogueCardProps = {
    card: GuitarCard,
}

function SingleCatalogueCard( {card}: SingleCatalogueCardProps): JSX.Element {

  const { id, name, previewImg, price } = card;

  const [reviews, setReviews] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewsLengthAction([id, setReviews]));
  }, [dispatch, id]);

  return (
    <div className="product-card">
      <img src={`/${previewImg}`} srcSet={`/${previewImg?.slice(0, -4)}@2x.jpg 2x`} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviews}</p>
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


