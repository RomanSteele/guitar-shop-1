import { useAppSelector } from '../../../hooks/hooks-index';
import { useParams } from 'react-router-dom';
import { GuitarCard, GuitarCards } from '../../../types/guitar';
import ReviewsList from '../reviews-list/reviews-list';
import { useEffect } from 'react';
import { store } from '../../../store';
import { fetchCurrentGuitarAction } from '../../../store/api-actions';
import Tabs from '../tabs/tabs';
import BreadcrumbsContent from '../../breadcrumbs/breadcrumbs';
import RatingStars  from '../../rating-stars/rating-stars';

function ProductPageContent(): JSX.Element {

  const { id } = useParams<{id: string}>();

  const currentGuitar = useAppSelector(({ DATA }) => DATA.activeGuitar);

  const { name, previewImg, price, comments, rating } = currentGuitar as GuitarCards;

  useEffect (() => {
    if (id) {
      store.dispatch(fetchCurrentGuitarAction(id));
    }
  }, [id]);

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <BreadcrumbsContent />
        <div className="product-container">
          <img className="product-container__img" src={`/${previewImg}`} srcSet={`/${previewImg?.slice(0, -4)}@2x.jpg 2x`} width="90" height="235" alt={name}/>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
            <div className="rate product-container__rating">
              <RatingStars rating={rating}/>
              <p className="visually-hidden">Оценка: Хорошо</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{comments.length}</p>
            </div>
            <Tabs guitar={currentGuitar as GuitarCard}/>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
            <a className="button button--red button--big product-container__button" href=".">Добавить в корзину</a>
          </div>
        </div>
        <ReviewsList reviews={comments} guitarName={name} id={Number(id)}/>
      </div>
    </main>
  );
}
export default ProductPageContent;
