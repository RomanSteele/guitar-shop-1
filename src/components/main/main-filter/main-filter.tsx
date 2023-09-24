import StringCountFilter from './string-count-filter';
import PriceFilter from './price-filter';
import TypeFilter from './type-filter';
import FilterClearButton from './filter-clear-button';
import { useAppSelector } from '../../../hooks/hooks-index';

function MainFilter(): JSX.Element {

  const language = useAppSelector(({DATA}) => DATA.language);

  return(
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">{language === 'russian' ?  'Фильтр' : 'Refine'}</h2>
      <PriceFilter />
      <TypeFilter />
      <StringCountFilter />
      <FilterClearButton/>
    </form>
  );
}

export default MainFilter;
