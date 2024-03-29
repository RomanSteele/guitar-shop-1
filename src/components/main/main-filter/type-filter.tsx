
import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FilterType } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setAcousticFilterType, setElectricFilterType, setFilterFourString, setFilterSevenString, setFilterSixString, setFilterTwelveString, setUkuleleFilterType } from '../../../store/slices/filter-slice';
import { filterNonNull } from '../../../utils/utils';


function TypeFilter(): JSX.Element {

  const currentAcousticFilterType = useAppSelector(({ FILTER }) => FILTER.filterAcousticType);
  const currentElectricFilterType = useAppSelector(({ FILTER }) => FILTER.filterElectricType);
  const currentUkuleleFilterType = useAppSelector(({ FILTER }) => FILTER.filterUkuleleType);
  const language = useAppSelector(({DATA}) => DATA.language);

  const acousticRef = useRef<HTMLInputElement | null>(null);
  const electricRef = useRef<HTMLInputElement | null>(null);
  const ukuleleRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const handleFilterTypeClick = (filterType: string) =>{


    if(filterType === FilterType.Acoustic){

      if(currentAcousticFilterType === FilterType.Acoustic){
        if(currentUkuleleFilterType || currentElectricFilterType)
        {dispatch(setFilterTwelveString(''));}
        return dispatch(setAcousticFilterType(''));
      }

      if(!currentUkuleleFilterType && !currentElectricFilterType)
      {dispatch(setFilterFourString(''));}
      dispatch(setAcousticFilterType(filterType));
    }


    if(filterType === FilterType.Electric){
      if(currentElectricFilterType === FilterType.Electric){

        if(!currentAcousticFilterType)
        {dispatch(setFilterTwelveString(''));}
        dispatch(setElectricFilterType(filterType));
        if(!currentUkuleleFilterType){
          dispatch(setFilterFourString(''));
        }
        return dispatch(setElectricFilterType(''));
      }

      if(!currentAcousticFilterType)
      {dispatch(setFilterTwelveString(''));}
      dispatch(setElectricFilterType(filterType));
    }


    if(filterType === FilterType.Ukulele){

      if(currentUkuleleFilterType === FilterType.Ukulele){
        if(!currentAcousticFilterType && !currentElectricFilterType)
        {dispatch(setFilterSixString(''));
          dispatch(setFilterSevenString(''));}
        if(!currentAcousticFilterType)
        {dispatch(setFilterTwelveString(''));}
        return dispatch(setUkuleleFilterType(''));
      }

      if(!currentAcousticFilterType && !currentElectricFilterType)
      {dispatch(setFilterSixString(''));
        dispatch(setFilterSevenString(''));}
      if(!currentAcousticFilterType)
      {dispatch(setFilterTwelveString(''));}

      dispatch(setUkuleleFilterType(filterType));
    }
  };

  const queryString = qs.stringify(filterNonNull({
    currentAcousticFilterType : currentAcousticFilterType === '' ?  '' : currentAcousticFilterType,
    currentElectricFilterType : currentElectricFilterType === '' ?  '' : currentElectricFilterType,
    currentUkuleleFilterType : currentUkuleleFilterType === '' ?  '' : currentUkuleleFilterType,
  }));

  useEffect(()=>{
    if (acousticRef.current && electricRef.current && ukuleleRef.current){
      acousticRef.current.checked = queryString.includes(FilterType.Acoustic);
      electricRef.current.checked = queryString.includes(FilterType.Electric);
      ukuleleRef.current.checked = queryString.includes(FilterType.Ukulele);
    }
  },[queryString]);


  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">{language === 'russian' ?  'Тип гитар' : 'Guitar type'}</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onClick={()=>handleFilterTypeClick(FilterType.Acoustic)}  className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"  ref={acousticRef}/>
        <label htmlFor="acoustic">{language === 'russian' ?  'Акустические гитары' : 'Acoustic guitars'}</label>
      </div>

      <div className="form-checkbox catalog-filter__block-item">
        <input onClick={()=>handleFilterTypeClick(FilterType.Electric)}  className="visually-hidden" type="checkbox" id="electric" name="electric" ref={electricRef}/>
        <label htmlFor="electric">{language === 'russian' ?  'Электрогитары' : 'Electroguitar'}</label>
      </div>

      <div className="form-checkbox catalog-filter__block-item">
        <input onClick={()=>handleFilterTypeClick(FilterType.Ukulele)}  className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" ref={ukuleleRef}/>
        <label htmlFor="ukulele">{language === 'russian' ?  'Укулеле' : 'Ukulele'}</label>
      </div>
    </fieldset>
  );
}

export default TypeFilter;
