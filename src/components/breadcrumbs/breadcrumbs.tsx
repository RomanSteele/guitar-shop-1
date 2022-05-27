import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks-index';

type Breadcrumbs = {
  id: number,
  name: string | undefined,
  route: string,
}

function BreadcrumbsContent(): JSX.Element {

  const { guitars } = useAppSelector(( State ) => State );

  const { id } = useParams<{id: string}>();

  const CrumbsName = guitars.find((element) => element.id === Number(id))?.name;

  const BREADCRUMBS: Breadcrumbs[] = [
    {
      id: 1,
      name: 'Главная',
      route: AppRoute.MainFirstPage,
    },
    {
      id: 2,
      name: 'Каталог',
      route: AppRoute.MainFirstPage,
    },
  ];

  if(CrumbsName) {
    BREADCRUMBS.push(
      {
        id: 3,
        name: CrumbsName,
        route: AppRoute.Guitar,
      },
    );
  }

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {
        BREADCRUMBS.map((crumb) => (
          <li className="breadcrumbs__item" key={crumb.id}><Link className="link" to={crumb.route} >{crumb.name}</Link>
          </li>
        ))
      }
    </ul>
  );
}

export default BreadcrumbsContent;

