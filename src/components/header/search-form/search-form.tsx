import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks/hooks-index';
import { store } from '../../../store';
import { fetchEnglishGuitarsSearchAction, fetchGuitarsSearchAction } from '../../../store/api-actions';

function SearchForm(): JSX.Element {

  const refContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [value,setValue]= useState('');
  const  guitars  =  useAppSelector(({ DATA }) => DATA.guitarsOfSearch );
  const language = useAppSelector(({DATA}) => DATA.language);
  const currentLocation = window.location;

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLLIElement>, id: number) => {
    if (evt.key === 'Enter') {
      navigate(AppRoute.GuitarCharacteristics.replace(':id', id.toString()));}
  };

  const handleOutsideClick = (evt: Event) => {
    const target = evt.target as Node;
    if (refContainer.current && !refContainer.current.contains(target)) {
      setValue('');
    }
  };

  useEffect(() => {
    setValue('');
  }, [currentLocation]);


  window.onpopstate  = function() {
    setValue('');
  };


  useEffect(() => {
    if(value){
      language === 'russian' ? store.dispatch(fetchGuitarsSearchAction(value)) : store.dispatch(fetchEnglishGuitarsSearchAction(value));
    }
  }, [language, value]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });


  return (
    <div ref={refContainer} className="form-search" >
      <form className="form-search__form" id="form-search" >
        <button onBlur={()=>{setValue('');}} className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">{language === 'russian' ?  'Начать поиск' : 'Start'}</span>
        </button>
        <input onChange={(event)=> setValue(event.target.value)} value={value} className="form-search__input" id="search" type="text" autoComplete="off" placeholder={language === 'russian' ?  'что вы ищите?' : 'What are you looking for?'}/>
        <label className="visually-hidden" htmlFor="search">{language === 'russian' ?  'Поиск' : 'Search'}</label>
      </form>
      {value === ''
        ?
        <ul  className="form-search__select-list hidden">
          <li className="form-search__select-item " tabIndex={0}  >{language === 'russian' ?  'Ничего не нашлось' : 'Nothing found'}</li>
        </ul>
        :
        <ul  className="list-opened form-search__select-list">
          {guitars.length === 0 ?
            <li className="form-search__select-item" tabIndex={0} >{language === 'russian' ?  'Ничего не нашлось' : 'Nothing found'}</li>
            :
            guitars.map((guitar) => (
              <li key = {guitar.id} onKeyDown={(evt) => handleKeyDown(evt, guitar.id)} onClick={() => navigate(AppRoute.GuitarCharacteristics.replace(':id', guitar.id.toString()))} className="form-search__select-item" tabIndex={0} >{guitar.name}</li>
            ))}
        </ul>}
      <button onClick={()=>{setValue('');}}className="form-search__reset" type="reset" form="form-search">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">{language === 'russian' ?  'Сбросить поиск' : 'Clear'}</span>
      </button>
    </div>);
}

export default SearchForm;
