import { useAppSelector } from '../../../hooks/hooks-index';
import { useParams } from 'react-router-dom';
import { GuitarCard, GuitarCards } from '../../../types/guitar';
import ReviewsList from '../reviews-list/reviews-list';
import { useEffect } from 'react';
import { store } from '../../../store';
import { fetchCurrentEnglishGuitarAction, fetchCurrentGuitarAction } from '../../../store/api-actions';
import Tabs from '../tabs/tabs';
import BreadcrumbsContent from '../../breadcrumbs/breadcrumbs';
import RatingStars  from '../../rating-stars/rating-stars';
import ProductPageButton from './product-page-button/product-page-button';

function ProductPageContent(): JSX.Element {

  const { id } = useParams<{id: string}>();

  const currentGuitar = useAppSelector(({ DATA }) => DATA.activeGuitar);
  const language = useAppSelector(({DATA}) => DATA.language);

  const { name, previewImg, price, comments, rating } = currentGuitar as GuitarCards;

  useEffect (() => {
    if (id) {
      language === 'russian' ? store.dispatch(fetchCurrentGuitarAction(id)) : store.dispatch(fetchCurrentEnglishGuitarAction(id));
    }
  }, [id,language]);

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">{language === 'russian' ?  'Товар' : 'Product'}</h1>
        <BreadcrumbsContent />
        <div className="product-container">
          <img className="product-container__img" src={`/${previewImg}`} srcSet={`/${previewImg?.slice(0, -4)}@2x.jpg 2x`} width="90" height="235" alt={name}/>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
            <div className="rate product-container__rating">
              <RatingStars rating={rating}/>
              <p className="visually-hidden"></p>
              <p className="rate__count"><span className="visually-hidden">{language === 'russian' ?  'Всего оценок:' : 'Total reviews:'}</span>{comments.length}</p>
            </div>
            <Tabs guitar={currentGuitar as GuitarCard}/>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">{language === 'russian' ?  'Цена:' : 'Price:'}</p>
            <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
            <ProductPageButton card={currentGuitar}/>
          </div>
        </div>
        <ReviewsList reviews={comments} guitarName={name} id={Number(id)}/>
      </div>
    </main>
  );
}
export default ProductPageContent;
