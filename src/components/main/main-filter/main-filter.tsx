import StringCountFilter from './string-count-filter';
import PriceFilter from './price-filter';
import TypeFilter from './type-filter';
import FilterClearButton from './filter-clear-button';

function MainFilter(): JSX.Element {


  return(
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <PriceFilter />
      <TypeFilter />
      <StringCountFilter />
      <FilterClearButton/>
    </form>
  );
}

export default MainFilter;
