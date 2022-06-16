import {SortType, OrderType} from '../../../const';

type MainSortProps ={
    handleSortTypeClick: (a: string) => void;
    handleOrderClick:(a: string) => void;
    type: string;
    order: string;
}


function MainSort({handleSortTypeClick,handleOrderClick, type, order}: MainSortProps): JSX.Element {

  return(
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button onClick={()=> handleSortTypeClick(SortType.Price)} className={`catalog-sort__type-button ${type === SortType.Price ? 'catalog-sort__type-button--active' : ''}`} aria-label="по цене">по цене</button>
        <button onClick={()=> handleSortTypeClick(SortType.Rating)} className={`catalog-sort__type-button ${type === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`} aria-label="по популярности">по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button onClick={()=> handleOrderClick(OrderType.Ascending)} className={`catalog-sort__order-button catalog-sort__order-button--up ${order === OrderType.Ascending ? 'catalog-sort__order-button--active': ''}`} aria-label="По возрастанию"></button>
        <button onClick={()=> handleOrderClick(OrderType.Descending)} className={`catalog-sort__order-button catalog-sort__order-button--down ${order === OrderType.Descending ? 'catalog-sort__order-button--active': ''}`} aria-label="По убыванию"></button>
      </div>
    </div>
  );
}

export default MainSort;
