import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, currentLanguage } from '../../const';
import { useAppSelector } from '../../hooks/hooks-index';
import { changeLanguage } from '../../store/slices/data-slice';
import { setFilters } from '../../store/slices/filter-slice';
import RUSFlag from './rus-flag';
import SearchForm from './search-form/search-form';
import USFlag from './us-flag';

function Header(): JSX.Element {

  const dispatch = useDispatch();

  const items = useAppSelector(({DATA})=> DATA.cartGuitars);
  const language = useAppSelector(({DATA}) => DATA.language);


  const handleFilterTypeClick = () =>{
    dispatch(setFilters(
      {
        sortType: '',
        sortOrder: '',
        currentAcousticType: '',
        currentElectricType:'',
        currentUkuleleType:'',
        filterPriceLow: '',
        filterPriceTop: '',
        currentFilterFourString:'',
        currentFilterSixString:'',
        currentFilterSevenString:'',
        currentFilterTwelveString:'',
      }));
  };


  const handleLanguageChange= ()=> {
    dispatch(changeLanguage(language === currentLanguage[0] ? currentLanguage[1] : currentLanguage[0]));
  };


  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" onClick={()=>handleFilterTypeClick()} to={AppRoute.MainFirstPage}><img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className="link main-nav__link" onClick={()=>handleFilterTypeClick()} to={AppRoute.MainFirstPage}>{language === 'russian' ?  'Каталог' : 'Catalog'}</Link>
            </li>
            <li><Link className="link main-nav__link" to="#">{language === 'russian' ?  'Где купить?' : 'Where to buy?'}</Link>
            </li>
            <li><Link className="link main-nav__link" to="#">{language === 'russian' ?  'О компании' : 'About us'}</Link>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <div onClick={handleLanguageChange} className="header__cart-link" aria-label="Корзина">
          <svg style={{ marginRight: '8px' }} className="header__cart-icon" width="14" height="14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            {language === 'russian' ?
              (<USFlag/>)
              :
              (<RUSFlag/>)}
          </svg><span  className="visually-hidden">{language === 'russian' ?  'Перейти в корзину' : 'Go to cart'}</span>
        </div>

        <Link className="header__cart-link" to={AppRoute.CartPage} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">{language === 'russian' ?  'Перейти в корзину' : 'Go to cart'}</span><span className="header__cart-count">{items.length}</span>
        </Link>

      </div>
    </header>);
}

export default Header;

