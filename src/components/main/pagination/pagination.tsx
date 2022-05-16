import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

type PaginationProps = {
    guitarsPerPage: number,
    totalGuitars: number,
    paginate:(target: number) => void,
    currentPage: number,
}

function Pagination({paginate, guitarsPerPage, totalGuitars, currentPage}:PaginationProps): JSX.Element {

  const pageNumbers = [];

  for (let i=1; i<= Math.ceil(totalGuitars/guitarsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {currentPage > 1 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to={`${AppRoute.Main  }/${  currentPage - 1}`} onClick={() => paginate(currentPage - 1)}>
              Назад
            </Link>
          </li>
          : ''}

        {pageNumbers.map((number) => (
          <li className={number === currentPage ?  'pagination__page pagination__page--active': 'pagination__page'} key={number}><Link className="link pagination__page-link" to={`${AppRoute.Main  }/${  number}`} onClick={() => paginate(number)}>{number}</Link>
          </li>
        ))}

        {currentPage < pageNumbers.length  ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to={`${AppRoute.Main  }/${  currentPage + 1}`} onClick={() => paginate(currentPage + 1)}>
              Далее
            </Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}
export default Pagination;
