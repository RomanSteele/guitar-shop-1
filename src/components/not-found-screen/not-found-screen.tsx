import { Link } from 'react-router-dom';
import Footer from '../footer/footer';

function NotFoundScreen(): JSX.Element{

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
      </header>
      <div className="page-title">
        <h1 className="page-title user-page__title">404 - Not Found!</h1>
        <Link to="/" className="logo__link">
          <span></span>
        </Link>

      </div>
      <Footer />
    </div>

  );
}

export default NotFoundScreen;
