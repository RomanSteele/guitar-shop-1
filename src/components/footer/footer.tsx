import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks-index';

function Footer(): JSX.Element {

  const language = useAppSelector(({DATA}) => DATA.language);

  return (
    <footer className="footer">
      <div className="footer__container container"><Link className="footer__logo logo" to="#"><img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/></Link>
        <div className="socials footer__socials">
          <ul className="socials__list">
            <li className="socials-item">
              <a className="socials__link" href="https://www.skype.com/" aria-label="skype">
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-skype"></use>
                </svg>
              </a>
            </li>
            <li className="socials-item">
              <a className="socials__link" href="https://www.vsco.com/" aria-label="vsco">
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-vsco"></use>
                </svg>
              </a>
            </li>
            <li className="socials-item">
              <a className="socials__link" href="https://www.pinterest.com/" aria-label="pinterest">
                <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <section className="footer__nav-section footer__nav-section--info">
          <h2 className="footer__nav-title">{language === 'russian' ?  'О нас' : 'About us'}</h2>
          <p className="footer__nav-content footer__nav-content--font-secondary">{language === 'russian' ?  'Магазин гитар, музыкальных инструментов и гитарная мастерская' : 'Musical instrument store and guitar workshop'}
            <br/>{language === 'russian' ?  'в Санкт-Петербурге.' : 'in St. Petersburg.'} <br/>
            <br/>{language === 'russian' ?  'Все инструменты проверены, отстроены' : 'All instruments have been checked and tuned'}
            <br/>{language === 'russian' ?  'и доведены до идеала!' : 'and brought to perfection!'}
          </p>
        </section>
        <section className="footer__nav-section footer__nav-section--links">
          <h2 className="footer__nav-title">{language === 'russian' ?  'Информация' : 'Information'}</h2>
          <ul className="footer__nav-list">
            <li className="footer__nav-list-item"><a className="link" href="#top">{language === 'russian' ?  'Где купить?' : 'Where to buy?'}</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">{language === 'russian' ?  'Блог' : 'Blog'}</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">{language === 'russian' ?  'Вопрос - ответ' : 'Questions and answers'}</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">{language === 'russian' ?  'Возврат' : 'Returns'}</a>
            </li>
            <li className="footer__nav-list-item"><a className="link" href="#top">{language === 'russian' ?  'Сервис-центры' : 'Service'}</a>
            </li>
          </ul>
        </section>
        <section className="footer__nav-section footer__nav-section--contacts">
          <h2 className="footer__nav-title">{language === 'russian' ?  'Контакты' : 'Contacts'}</h2>
          <p className="footer__nav-content">{language === 'russian' ?  'г. Санкт-Петербург,' : 'Saint Petersburg,'}<br/> {language === 'russian' ?  'м. Невский проспект,' : 'm. Nevsky Prospekt,'} <br/> {language === 'russian' ?  'ул. Казанская 6.' : 'st. Kazanskaya 6.'}</p>
          <div className="footer__nav-content">
            <svg className="footer__icon" width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-phone"></use>
            </svg><a className="link" href="tel:88125005050"> 8-812-500-50-50</a>
          </div>
          <p className="footer__nav-content">{language === 'russian' ?  'Режим работы:' : 'Working hours'}<br/>
            <span className="footer__span">
              <svg className="footer__icon" width="13" height="13" aria-hidden="true">
                <use xlinkHref="#icon-clock"></use>
              </svg><span>{language === 'russian' ?  'с 11:00 до 20:00' : 'from 11:00 to 20:00'} </span>
              <span>{language === 'russian' ?  'без выходных' : 'seven days a week'}</span>
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;


