
import { useDispatch } from 'react-redux';
import { FilterType } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setFilterType } from '../../../store/slices/filter-slice';


function TypeFilter(): JSX.Element {

  const currentFilterType = useAppSelector(({ FILTER }) => FILTER.filterType);

  const dispatch = useDispatch();

  const handleFilterTypeClick = (filterType: string) =>{
    dispatch(setFilterType(filterType));
  };


  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        {currentFilterType === FilterType.Acoustic ?
          <input onChange={()=>handleFilterTypeClick(FilterType.Default)}  className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"  checked={currentFilterType === FilterType.Acoustic}/>
          :
          <input onChange={()=>handleFilterTypeClick(FilterType.Acoustic)}  className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"  checked={currentFilterType === FilterType.Acoustic}/>}
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>

      <div className="form-checkbox catalog-filter__block-item">
        {currentFilterType === FilterType.Electric ?
          <input onChange={()=>handleFilterTypeClick(FilterType.Default)}  className="visually-hidden" type="checkbox" id="electric" name="electric" checked={currentFilterType === FilterType.Electric}/>
          :
          <input onChange={()=>handleFilterTypeClick(FilterType.Electric)}  className="visually-hidden" type="checkbox" id="electric" name="electric" checked={currentFilterType === FilterType.Electric}/>}
        <label htmlFor="electric">Электрогитары</label>
      </div>

      <div className="form-checkbox catalog-filter__block-item">
        {currentFilterType === FilterType.Ukulele ?
          <input onChange={()=>handleFilterTypeClick(FilterType.Default)}  className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={currentFilterType === FilterType.Ukulele}/>
          :
          <input onChange={()=>handleFilterTypeClick(FilterType.Ukulele)}  className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={currentFilterType === FilterType.Ukulele}/>}
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default TypeFilter;
