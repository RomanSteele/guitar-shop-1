import { useAppSelector } from '../../hooks/hooks-index';
import Footer from '../footer/footer';
import Header from '../header/header';

function NotFoundScreen(): JSX.Element{

  const language = useAppSelector(({DATA}) => DATA.language);

  return (
    <>
      <Header />
      <main className="page-content">
        <h1 className="page-content__title title title--bigger">{language === 'russian' ?  '404 - Не найдено!' : '404 - Not Found!'}</h1>
      </main>
      <Footer />
    </>

  );
}

export default NotFoundScreen;
