
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks-index';
import { setFilters } from '../../store/slices/filter-slice';

type Breadcrumbs = {
  id: number,
  name: string | undefined,
  route: string,
}

function BreadcrumbsContent(): JSX.Element {

  const dispatch = useDispatch();

  const currentGuitar = useAppSelector(({ DATA }) => DATA.activeGuitar);

  const { id } = useParams<{id: string}>();

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

  if(id) {
    const CrumbsName = currentGuitar.name;
    BREADCRUMBS.push(
      {
        id: 3,
        name: CrumbsName,
        route: AppRoute.Guitar,
      },
    );
  }

  const handleFilterTypeClick = (item:string) =>{
    if(item === AppRoute.MainFirstPage){
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
    }
  };

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      {
        BREADCRUMBS.map((crumb) => (
          <li className="breadcrumbs__item" key={crumb.id}><Link onClick={()=>handleFilterTypeClick(crumb.route)} className="link" to={crumb.route} >{crumb.name}</Link>
          </li>
        ))
      }
    </ul>
  );
}

export default BreadcrumbsContent;

