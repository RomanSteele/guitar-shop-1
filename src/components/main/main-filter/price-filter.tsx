import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/hooks-index';
import { setFilterPrice } from '../../../store/slices/filter-slice';
import { EventPropsType } from '../../../types/filter';


function PriceFilter(): JSX.Element {


  const dispatch = useDispatch();

  const  guitars  = useAppSelector(({ DATA }) => DATA.guitars );

  const currentFilterPriceLow = useAppSelector(({ FILTER }) => FILTER.filterPriceLow);
  const currentFilterPriceTop = useAppSelector(({ FILTER }) => FILTER.filterPriceTop);

  const [minPlaceholderPrice, setMinPlaceholderPrice] = useState(0);
  const [maxPlaceholderPrice, setMaxPlaceholderPrice] = useState(0);


  useEffect(()=>{
    if(guitars.length > 0){
      setMinPlaceholderPrice(guitars.slice().sort((a, b) => a.price - b.price)[0].price);
      setMaxPlaceholderPrice(guitars.slice().sort((a, b) => b.price - a.price)[0].price);
    }
  },[guitars]);


  const handleFilterPriceClick = (lowPrice: string, highPrice: string) =>{
    dispatch(setFilterPrice({lowPrice, highPrice}));
  };

  const handleFilterLowPriceBlur = (evt:EventPropsType): void => {
    if (evt.target.value && Number(evt.target.value) < minPlaceholderPrice) {
      evt.target.value = String(minPlaceholderPrice);
      handleFilterPriceClick(evt.target.value,currentFilterPriceTop);
    }
  };

  const handleFilterHighPriceBlur = (evt:EventPropsType): void => {
    if (evt.target.value && Number(evt.target.value) > maxPlaceholderPrice) {
      evt.target.value = String(maxPlaceholderPrice);
      handleFilterPriceClick(currentFilterPriceLow, evt.target.value);
    }
    if (evt.target.value && Number(evt.target.value) < minPlaceholderPrice){
      evt.target.value = String(maxPlaceholderPrice);
      handleFilterPriceClick(currentFilterPriceLow, evt.target.value);
    }
  };

  return(
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input onChange={(event)=>handleFilterPriceClick(event.target.value,currentFilterPriceTop)} onBlur={handleFilterLowPriceBlur} type="number" value={currentFilterPriceLow ? currentFilterPriceLow : ''} min={0} placeholder={minPlaceholderPrice.toString()} id="priceMin" name="от"/>
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input onChange={(event)=>handleFilterPriceClick(currentFilterPriceLow, event.target.value)} onBlur={handleFilterHighPriceBlur} type="number" value={currentFilterPriceTop ? currentFilterPriceTop : ''} min={0} placeholder={maxPlaceholderPrice.toString()} id="priceMax" name="до"/>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
