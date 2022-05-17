import { useAppSelector } from '../../../hooks/hooks-index';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { GuitarCard } from '../../../types/guitar';
import Reviews from '../reviews-list/reviews-list';
import { useEffect } from 'react';
import { store } from '../../../store';
import { fetchReviewsAction } from '../../../store/api-actions';


function ProductPageContent(): JSX.Element {

  const navigate = useNavigate();

  const { guitars } = useAppSelector(( State ) => State );

  const { reviews } = useAppSelector(( State ) => State );

  const { id } = useParams<{id: string}>();

  const card = guitars.find((element) => element.id === Number(id));

  console.log(card);

  if (!card) {
    navigate(AppRoute.NotFound);
  }

  const { name, previewImg, vendorCode, price, description, stringCount, type, rating } = card as GuitarCard;

  useEffect(() => {
    store.dispatch(fetchReviewsAction(Number(id)));
  }, [id]);

  return(
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Товар</a>
          </li>
        </ul>
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
            <div className="tabs">
              <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
              <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{vendorCode}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">{type}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">{stringCount} струнная</td>
                  </tr>
                </table>
                <p className="tabs__product-description hidden">{description}</p>
              </div>
            </div>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
            <a className="button button--red button--big product-container__button" href=".">Добавить в корзину</a>
          </div>
        </div>
        <Reviews reviews={reviews} id={Number(id)}/>
      </div>
    </main>
  );
}
export default ProductPageContent;
