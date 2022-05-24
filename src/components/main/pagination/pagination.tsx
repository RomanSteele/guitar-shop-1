import { Link } from 'react-router-dom';
import { AppRoute, GUITARS_PER_PAGE } from '../../../const';

type PaginationProps = {
    currentPage: number,
    totalGuitars: number,
}

function Pagination({totalGuitars, currentPage}:PaginationProps): JSX.Element {

  const pageNumbers = [];

  for (let i=1; i<= Math.ceil(totalGuitars/GUITARS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {currentPage > 1 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to={AppRoute.CurrentMainPage.replace(':currentPage', (currentPage - 1).toString())}>
              Назад
            </Link>
          </li>
          : ''}

        {pageNumbers.map((_item, index) => (
          <li className={currentPage === index + 1 ?  'pagination__page pagination__page--active': 'pagination__page'} key={`${index + 1}`}>
            <Link className="link pagination__page-link" to={AppRoute.CurrentMainPage.replace(':currentPage', (index + 1).toString())}>{index+1}</Link>
          </li>
        ))}

        {currentPage < pageNumbers.length  ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to={AppRoute.CurrentMainPage.replace(':currentPage', (currentPage + 1).toString())}>
              Далее
            </Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}
export default Pagination;
