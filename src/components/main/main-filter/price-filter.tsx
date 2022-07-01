import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../hooks/hooks-index';
import { store } from '../../../store';
import { fetchTotalMaxPrice, fetchTotalMinPrice } from '../../../store/api-actions';
import { setFilterPrice } from '../../../store/slices/filter-slice';
import { EventPropsType } from '../../../types/filter';


function PriceFilter(): JSX.Element {

  const dispatch = useDispatch();

  const  totalMinPrice  = useAppSelector(({ FILTER }) => FILTER.minPrice );
  const  totalMaxPrice  = useAppSelector(({ FILTER }) => FILTER.maxPrice );

  const currentFilterPriceLow = useAppSelector(({ FILTER }) => FILTER.filterPriceLow);
  const currentFilterPriceTop = useAppSelector(({ FILTER }) => FILTER.filterPriceTop);

  const handleFilterPriceClick = (lowPrice: string, highPrice: string) =>{
    dispatch(setFilterPrice({lowPrice, highPrice}));
  };

  const handleFilterLowPriceBlur = (evt:EventPropsType): void => {
    if (evt.target.value && Number(evt.target.value) < totalMinPrice) {
      evt.target.value = String(totalMinPrice);
      handleFilterPriceClick(evt.target.value,currentFilterPriceTop);
    }
    if (evt.target.value && Number(evt.target.value) > Number(currentFilterPriceTop)&& currentFilterPriceTop){
      toast.error('Минимальная цена не может быть больше максимальной!');
      evt.target.value = String(totalMinPrice);
      handleFilterPriceClick(evt.target.value, currentFilterPriceTop);
    }
  };

  const handleFilterHighPriceBlur = (evt:EventPropsType): void => {
    if (evt.target.value && Number(evt.target.value) > totalMaxPrice) {
      evt.target.value = String(totalMaxPrice);
      handleFilterPriceClick(currentFilterPriceLow, evt.target.value);
    }
    if (evt.target.value && Number(evt.target.value) < Number(currentFilterPriceLow)){
      toast.error('Максимальная цена не может быть меньше минимальной!');
      evt.target.value = String(totalMaxPrice);
      handleFilterPriceClick(currentFilterPriceLow, evt.target.value);
    }
  };


  useEffect(()=>{
    store.dispatch(fetchTotalMinPrice());
    store.dispatch(fetchTotalMaxPrice());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input onChange={(event)=>handleFilterPriceClick(event.target.value,currentFilterPriceTop)} onBlur={handleFilterLowPriceBlur} type="number" value={currentFilterPriceLow ? currentFilterPriceLow : ''} min={0} placeholder={totalMinPrice?.toString()} id="priceMin" name="от"/>
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input onChange={(event)=>handleFilterPriceClick(currentFilterPriceLow, event.target.value)} onBlur={handleFilterHighPriceBlur} type="number" value={currentFilterPriceTop ? currentFilterPriceTop : ''} min={0} placeholder={totalMaxPrice?.toString()} id="priceMax" name="до"/>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
