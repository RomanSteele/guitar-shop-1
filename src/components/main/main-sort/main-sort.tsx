import { useDispatch } from 'react-redux';
import {SortType, OrderType} from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setGuitarsOrder, setGuitarsType } from '../../../store/slices/filter-slice';


function MainSort(): JSX.Element {

  const dispatch = useDispatch();

  const currentSortType = useAppSelector(({ FILTER }) => FILTER.sortType);
  const currentOrderType = useAppSelector(({ FILTER }) => FILTER.sortOrder);
  const language = useAppSelector(({DATA}) => DATA.language);

  const handleOrderClick = (orderType: string) =>{
    if(!currentSortType) {
      dispatch(setGuitarsType(SortType.Price));
    }
    dispatch(setGuitarsOrder(orderType));
  };


  const handleSortTypeClick = (sortType: string) =>{
    if(!currentOrderType) {
      dispatch(setGuitarsOrder(OrderType.Ascending));
    }
    dispatch(setGuitarsType(sortType));
  };

  return(
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">{language === 'russian' ?  'Сортировать:' : 'Sort by:'}</h2>
      <div className="catalog-sort__type">
        <button onClick={()=> handleSortTypeClick(SortType.Price)} className={`catalog-sort__type-button ${currentSortType === SortType.Price ? 'catalog-sort__type-button--active' : ''}`} aria-label="по цене">{language === 'russian' ?  'по цене' : 'price'}</button>
        <button onClick={()=> handleSortTypeClick(SortType.Rating)} className={`catalog-sort__type-button ${currentSortType === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`} aria-label="по популярности">{language === 'russian' ?  'по популярности' : 'rating'}</button>
      </div>
      <div className="catalog-sort__order">
        <button onClick={()=> handleOrderClick(OrderType.Ascending)} className={`catalog-sort__order-button catalog-sort__order-button--up ${currentOrderType === OrderType.Ascending ? 'catalog-sort__order-button--active': ''}`} aria-label={language === 'russian' ?  'По возрастанию' : 'Ascending'}></button>
        <button onClick={()=> handleOrderClick(OrderType.Descending)} className={`catalog-sort__order-button catalog-sort__order-button--down ${currentOrderType === OrderType.Descending ? 'catalog-sort__order-button--active': ''}`} aria-label={language === 'russian' ?  'По убыванию' : 'Descending'}></button>
      </div>
    </div>
  );
}

export default MainSort;
