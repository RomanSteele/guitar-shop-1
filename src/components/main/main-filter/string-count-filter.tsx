import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FilterString,FilterType } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setFilterFourString, setFilterSixString, setFilterSevenString, setFilterTwelveString } from '../../../store/slices/filter-slice';
import { filterNonNull } from '../../../utils/utils';


function StringCountFilter(): JSX.Element {

  const currentFilterFourString = useAppSelector(({ FILTER }) => FILTER.filterFourString);
  const currentFilterSixString = useAppSelector(({ FILTER }) => FILTER.filterSixString);
  const currentFilterSevenString = useAppSelector(({ FILTER }) => FILTER.filterSevenString);
  const currentFilterTwelveString = useAppSelector(({ FILTER }) => FILTER.filterTwelveString);

  const currentAcousticFilterType = useAppSelector(({ FILTER }) => FILTER.filterAcousticType);
  const currentElectricFilterType = useAppSelector(({ FILTER }) => FILTER.filterElectricType);
  const currentUkuleleFilterType = useAppSelector(({ FILTER }) => FILTER.filterUkuleleType);

  const language = useAppSelector(({DATA}) => DATA.language);

  const fourStringRef = useRef<HTMLInputElement | null>(null);
  const sixStringRef = useRef<HTMLInputElement | null>(null);
  const sevenStringRef = useRef<HTMLInputElement | null>(null);
  const twelveStringRef = useRef<HTMLInputElement | null>(null);

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
    currentFilterFourString : currentFilterFourString === '' ?  '' : currentFilterFourString,
    currentFilterSixString : currentFilterSixString === '' ?  '' : currentFilterSixString,
    currentFilterSevenString : currentFilterSevenString === '' ?  '' : currentFilterSevenString,
    currentFilterTwelveString : currentFilterTwelveString === '' ?  '' : currentFilterTwelveString,
  }));

  const disabledChecker=(item:string)=> {
    if(!queryString.includes(FilterType.Ukulele) && !queryString.includes(FilterType.Acoustic) && !queryString.includes(FilterType.Electric)){
      return false;
    }
    if (item === FilterString.Four){
      if(!queryString.includes(FilterType.Ukulele) && !queryString.includes(FilterType.Electric)){
        return true;
      }}
    if (item === FilterString.Six || item === FilterString.Seven){
      if(!queryString.includes(FilterType.Acoustic) && !queryString.includes(FilterType.Electric)){
        return true;
      }}
    if (item === FilterString.Twelve){
      if(!queryString.includes(FilterType.Acoustic)){
        return true;
      }
    }

  };


  useEffect(()=>{
    if (fourStringRef.current && sixStringRef.current && sevenStringRef.current && twelveStringRef.current){
      fourStringRef.current.checked = queryString.includes(FilterString.Four);
      sixStringRef.current.checked = queryString.includes(FilterString.Six);
      sevenStringRef.current.checked = queryString.includes(FilterString.Seven);
      twelveStringRef.current.checked = queryString.includes(FilterString.Twelve);
    }
  },[queryString]);


  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">{language === 'russian' ?  'Количество струн' : 'String number'}</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Four)}  className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" ref={fourStringRef} disabled={disabledChecker(FilterString.Four)} />
        <label htmlFor="4-strings">4</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Six)}  className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" ref={sixStringRef} disabled={disabledChecker(FilterString.Six)} />
        <label htmlFor="6-strings">6</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Seven)}  className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" ref={sevenStringRef} disabled={disabledChecker(FilterString.Seven)}  />
        <label htmlFor="7-strings">7</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input onChange={()=>handleFilterStringClick(FilterString.Twelve)}  className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" ref={twelveStringRef} disabled={disabledChecker(FilterString.Twelve)} />
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>

  );
}

export default StringCountFilter;

