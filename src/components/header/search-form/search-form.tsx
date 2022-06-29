import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { store } from '../../../store';
import { fetchGuitarsSearchAction } from '../../../store/api-actions';

function SearchForm(): JSX.Element {

  const navigate = useNavigate();
  const [value,setValue]= useState('');
  const  guitars  =  useAppSelector(({ DATA }) => DATA.guitarsOfSearch );
  const currentLocation = window.location;


  useEffect(() => {
    setValue('');
  }, [currentLocation]);


  window.onpopstate  = function() {
    setValue('');
  };


  useEffect(() => {
    if(value){
      store.dispatch(fetchGuitarsSearchAction(value));
    }
  }, [value]);


  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input onChange={(event)=> setValue(event.target.value)} className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?"/>
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {value === ''
        ?
        <ul className="form-search__select-list hidden">
          <li className="form-search__select-item " tabIndex={0}  >Ничего не нашлось</li>
        </ul>
        :
        <ul className="list-opened form-search__select-list">
          {guitars.length === 0 ?
            <li className="form-search__select-item" tabIndex={0} >Ничего не нашлось</li>
            :
            guitars.map((guitar) => (
              <li key = {guitar.id} onClick={() => navigate(AppRoute.GuitarCharacteristics.replace(':id', guitar.id.toString()))} className="form-search__select-item" tabIndex={0} >{guitar.name}</li>
            ))}
        </ul>}
      <button onClick={()=>{setValue('');}}className="form-search__reset" type="reset" form="form-search">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>);
}

export default SearchForm;
