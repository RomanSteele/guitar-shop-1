
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../store/slices/filter-slice';

function FilterClearButton(): JSX.Element {

  const dispatch = useDispatch();

  const handleFilterTypeClick = () =>{
    dispatch(setFilters(
      {
        sortType: '',
        sortOrder: '',
        currentAcousticType: '',
        currentElectricType:'',
        currentUkuleleType:'',
        filterPriceLow: '',
        filterPriceTop: '',
        currentFilterFourString:'',
        currentFilterSixString:'',
        currentFilterSevenString:'',
        currentFilterTwelveString:'',
      }));
  };


  return(

    <button onClick={()=> handleFilterTypeClick()} className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>

  );
}

export default FilterClearButton;

