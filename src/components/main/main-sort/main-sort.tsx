
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
        <button onClick={()=> handleSortTypeClick('price')} className={`catalog-sort__type-button ${type === 'price' ? 'catalog-sort__type-button--active' : ''}`} aria-label="по цене">по цене</button>
        <button onClick={()=> handleSortTypeClick('rating')} className={`catalog-sort__type-button ${type === 'rating' ? 'catalog-sort__type-button--active' : ''}`} aria-label="по популярности">по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button onClick={()=> handleOrderClick('asc')} className={`catalog-sort__order-button catalog-sort__order-button--up ${order === 'asc' ? 'catalog-sort__order-button--active': ''}`} aria-label="По возрастанию"></button>
        <button onClick={()=> handleOrderClick('dsc')} className={`catalog-sort__order-button catalog-sort__order-button--down ${order === 'dsc' ? 'catalog-sort__order-button--active': ''}`} aria-label="По убыванию"></button>
      </div>
    </div>
  );
}

export default MainSort;
