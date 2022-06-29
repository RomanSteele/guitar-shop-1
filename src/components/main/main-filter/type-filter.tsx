
import { useDispatch } from 'react-redux';
import { FilterType } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setAcousticFilterType, setElectricFilterType, setUkuleleFilterType } from '../../../store/slices/filter-slice';


function TypeFilter(): JSX.Element {

  const currentAcousticFilterType = useAppSelector(({ FILTER }) => FILTER.filterAcousticType);
  const currentElectricFilterType = useAppSelector(({ FILTER }) => FILTER.filterElectricType);
  const currentUkuleleFilterType = useAppSelector(({ FILTER }) => FILTER.filterUkuleleType);

  const dispatch = useDispatch();

  const handleFilterTypeClick = (filterType: string) =>{
    if(filterType === FilterType.Acoustic){
      if(currentAcousticFilterType === FilterType.Acoustic){
        return dispatch(setAcousticFilterType(''));
      }
      dispatch(setAcousticFilterType(filterType));
    }
    if(filterType === FilterType.Electric){
      if(currentElectricFilterType === FilterType.Electric){
        return dispatch(setElectricFilterType(''));
      }
      dispatch(setElectricFilterType(filterType));
    }
    if(filterType === FilterType.Ukulele){
      if(currentUkuleleFilterType === FilterType.Ukulele){
        return dispatch(setUkuleleFilterType(''));
      }
      dispatch(setUkuleleFilterType(filterType));
    }
  };


  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input onClick={()=>handleFilterTypeClick(FilterType.Acoustic)}  className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"  defaultChecked={currentAcousticFilterType?.toString() !==''}/>
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>

      <div className="form-checkbox catalog-filter__block-item">
        <input onClick={()=>handleFilterTypeClick(FilterType.Electric)}  className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked={currentElectricFilterType?.toString() !==''}/>
        <label htmlFor="electric">Электрогитары</label>
      </div>

      <div className="form-checkbox catalog-filter__block-item">
        <input onClick={()=>handleFilterTypeClick(FilterType.Ukulele)}  className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked={currentUkuleleFilterType?.toString() !==''}/>
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default TypeFilter;
