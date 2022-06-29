import qs from 'qs';
import { useDispatch } from 'react-redux';
import { FilterString } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setFilterFourString, setFilterSixString, setFilterSevenString, setFilterTwelveString } from '../../../store/slices/filter-slice';
import { filterNonNull } from '../../../utils/utils';


function StringCountFilter(): JSX.Element {

  const currentFilterFourString = useAppSelector(({ FILTER }) => FILTER.filterFourString);
  const currentFilterSixString = useAppSelector(({ FILTER }) => FILTER.filteSixString);
  const currentFilterSevenString = useAppSelector(({ FILTER }) => FILTER.filterSevenString);
  const currentFilterTwelveString = useAppSelector(({ FILTER }) => FILTER.filterTwelveString);

  const currentAcousticFilterType = useAppSelector(({ FILTER }) => FILTER.filterAcousticType);
  const currentElectricFilterType = useAppSelector(({ FILTER }) => FILTER.filterElectricType);
  const currentUkuleleFilterType = useAppSelector(({ FILTER }) => FILTER.filterUkuleleType);

  const dispatch = useDispatch();

  const handleFilterStringClick = (filterString: string) =>{
    if(filterString === FilterString.Four){
      if(currentFilterFourString === FilterString.Four){
        return dispatch(setFilterFourString(''));
      }
      dispatch(setFilterFourString(filterString));
    }
    if(filterString === FilterString.Six){
      if(currentFilterSixString === FilterString.Six){
        return dispatch(setFilterSixString(''));
      }
      dispatch(setFilterSixString(filterString));
    }
    if(filterString === FilterString.Seven){
      if(currentFilterSevenString === FilterString.Seven){
        return dispatch(setFilterSevenString(''));
      }
      dispatch(setFilterSevenString(filterString));
    }
    if(filterString === FilterString.Twelve){
      if(currentFilterTwelveString === FilterString.Twelve){
        return dispatch(setFilterTwelveString(''));
      }
      dispatch(setFilterTwelveString(filterString));
    }
  };

  const queryString = qs.stringify(filterNonNull({
    currentAcousticFilterType : currentAcousticFilterType === '' ?  '' : currentAcousticFilterType,
    currentElectricFilterType : currentElectricFilterType === '' ?  '' : currentElectricFilterType,
    currentUkuleleFilterType : currentUkuleleFilterType === '' ?  '' : currentUkuleleFilterType,
  }));

  const disabledChecker=(item:string)=> {
    if(queryString === ''){
      return false;
    }
    if (item === FilterString.Four){
      if(!queryString.includes('ukulele')){
        return true;
      }}
    if (item === FilterString.Six || item === FilterString.Seven){
      if(!queryString.includes('acoustic') && !queryString.includes('electric')){
        return true;
      }}
    if (item === FilterString.Twelve){
      if(!queryString.includes('acoustic')){
        return true;
      }
    }

  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Four)}  className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked={currentFilterFourString?.toString() !== ''} disabled={disabledChecker(FilterString.Four)} />
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Six)}  className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked={currentFilterSixString?.toString() !== ''} disabled={disabledChecker(FilterString.Six)} />
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Seven)}  className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" defaultChecked={currentFilterSevenString?.toString() !== ''} disabled={disabledChecker(FilterString.Seven)}  />
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Twelve)}  className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" defaultChecked={currentFilterTwelveString?.toString() !== ''} disabled={disabledChecker(FilterString.Twelve)} />
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>

  );
}

export default StringCountFilter;

