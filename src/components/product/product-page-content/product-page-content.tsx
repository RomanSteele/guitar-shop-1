import { useAppSelector } from '../../../hooks/hooks-index';
import { useParams } from 'react-router-dom';
import { GuitarCard } from '../../../types/guitar';
import ReviewsList from '../reviews-list/reviews-list';
import { useEffect } from 'react';
import { store } from '../../../store';
import { fetchReviewsAction } from '../../../store/api-actions';
import Tabs from '../tabs/tabs';
import BreadcrumbsContent from '../../breadcrumbs/breadcrumbs';
import { fetchCurrentGuitarAction } from '../../../store/api-actions';

function ProductPageContent(): JSX.Element {

  const { reviews } = useAppSelector(( State ) => State );

  const { id } = useParams<{id: string}>();

  const currentGuitar = useAppSelector(( State ) => State.activeGuitar);

  const { name, previewImg, price, rating } = currentGuitar as GuitarCard;

  useEffect (() => {
    if (id) {
      store.dispatch(fetchCurrentGuitarAction(id));
      store.dispatch(fetchReviewsAction(Number(id)));
    }
  }, [id]);

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <BreadcrumbsContent />
        <div className="product-container">
          <img className="product-container__img" src={`../${previewImg}`} srcSet={`../${previewImg}`} width="90" height="235" alt={name}/>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
            <div className="rate product-container__rating">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <p className="visually-hidden">Оценка: Хорошо</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{rating}</p>
            </div>
            <Tabs guitar={currentGuitar as GuitarCard}/>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
            <a className="button button--red button--big product-container__button" href=".">Добавить в корзину</a>
          </div>
        </div>
        <ReviewsList reviews={reviews} guitarName={name} id={Number(id)}/>
      </div>
    </main>
  );
}
export default ProductPageContent;
