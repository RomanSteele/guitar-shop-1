import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';

function SearchForm(): JSX.Element {

  const navigate = useNavigate();
  const [value,setValue]= useState('');
  const  guitars  = useAppSelector(( State ) => State.guitars );
  const filteredGuitars = guitars.filter((guitar) => guitar.name.toLowerCase().includes(value.toLowerCase()));
  const currentLocation = useLocation();

  useEffect(() => {
    setValue('');
  }, [currentLocation]);


  window.onpopstate  = function() {
    setValue('');
    console.log('y');
  };

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
          <li className="form-search__select-item" tabIndex={0} >Ничего не нашлось</li>
        </ul>
        :
        <ul className="list-opened form-search__select-list">
          {filteredGuitars.map((guitar) => (
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
