import Footer from '../footer/footer';
import Header from '../header/header';

function NotFoundScreen(): JSX.Element{

  return (
    <>
      <Header />
      <main className="page-content">
        <h1 className="page-content__title title title--bigger">404 - Not Found!</h1>
      </main>
      <Footer />
    </>

  );
}

export default NotFoundScreen;
