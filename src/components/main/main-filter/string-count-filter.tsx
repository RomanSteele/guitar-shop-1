import { useDispatch } from 'react-redux';
import { FilterString, FilterType } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setFilterString } from '../../../store/slices/filter-slice';


function StringCountFilter(): JSX.Element {

  const currentFilterString = useAppSelector(({ FILTER }) => FILTER.filterString);
  const currentFilterType = useAppSelector(({ FILTER }) => FILTER.filterType);

  const dispatch = useDispatch();

  const handleFilterStringClick = (filterString: string) =>{
    dispatch(setFilterString(filterString));
  };

  const disabledChecker=(item:string)=> {
    if (item === FilterString.Four){
      if(currentFilterType === FilterType.Acoustic || currentFilterType === FilterType.Electric){
        return true;
      }}
    if (item === FilterString.Six || item === FilterString.Seven){
      if(currentFilterType === FilterType.Ukulele){
        return true;
      }}
    if (item === FilterString.Twelve){
      if(currentFilterType === FilterType.Ukulele || currentFilterType === FilterType.Electric){
        return true;
      }
    }

  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      <div className="form-checkbox catalog-filter__block-item">
        {currentFilterString === FilterString.Four ?
          <input onChange={()=>handleFilterStringClick(FilterString.Default)}  className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked={currentFilterString === FilterString.Four}/>
          :
          <input onChange={()=>handleFilterStringClick(FilterString.Four)}  className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked={currentFilterString === FilterString.Four} disabled={disabledChecker(FilterString.Four)}/>}
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        {currentFilterString === FilterString.Six ?
          <input onChange={()=>handleFilterStringClick(FilterString.Default)} className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked={currentFilterString === FilterString.Six}/>
          :
          <input onChange={()=>handleFilterStringClick(FilterString.Six)}  className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked={currentFilterString === FilterString.Six} disabled={disabledChecker(FilterString.Six)}/>}
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        {currentFilterString === FilterString.Seven ?
          <input onChange={()=>handleFilterStringClick(FilterString.Default)}  className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" checked={currentFilterString === FilterString.Seven}/>
          :
          <input onChange={()=>handleFilterStringClick(FilterString.Seven)}  className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" checked={currentFilterString === FilterString.Seven} disabled={disabledChecker(FilterString.Seven)} />}
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        {currentFilterString === FilterString.Twelve ?
          <input onChange={()=>handleFilterStringClick(FilterString.Default)}  className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" checked={currentFilterString === FilterString.Twelve}/>
          :
          <input onChange={()=>handleFilterStringClick(FilterString.Twelve)}  className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" checked={currentFilterString === FilterString.Twelve} disabled={disabledChecker(FilterString.Twelve)}/>}
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>

  );
}

export default StringCountFilter;

