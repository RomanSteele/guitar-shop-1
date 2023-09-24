import { Link } from 'react-router-dom';
import { GuitarCards } from '../../../types/guitar';
import { AppRoute } from '../../../const';
import RatingStars from '../../rating-stars/rating-stars';
import SingleCatalogueCardButton from './single-catalogue-card-button.tsx/single-catalogue-card-button';
import { useAppSelector } from '../../../hooks/hooks-index';

type SingleCatalogueCardProps = {
    card: GuitarCards,
}

function SingleCatalogueCard( {card}: SingleCatalogueCardProps): JSX.Element {

  const language = useAppSelector(({DATA}) => DATA.language);

  const { id, name, previewImg, price, comments,rating } = card;

  return (
    <div className="product-card">
      <img src={`/${previewImg}`} srcSet={`/${previewImg?.slice(0, -4)}@2x.jpg 2x`} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={rating}/>
          <p className="visually-hidden"></p>
          <p className="rate__count"><span className="visually-hidden">{language === 'russian' ?  'Всего оценок:' : 'Total reviews:'}</span>{comments.length}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">{language === 'russian' ?  'Цена:' : 'Price:'}</span>{price}
        </p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to={`${AppRoute.GuitarCharacteristics.replace(':id', id.toString())}`}>{language === 'russian' ?  'Подробнее' : 'Details'}</Link>
        <SingleCatalogueCardButton card={card}/>
      </div>
    </div>
  );
}

export default SingleCatalogueCard;
