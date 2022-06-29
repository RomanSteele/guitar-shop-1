import CardsList from '../cards-list/cards-list';
import { useAppSelector } from '../../../hooks/hooks-index';
import { useEffect } from 'react';
import { fetchGuitarsAction, fetchSortedGuitarsAction } from '../../../store/api-actions';
import Pagination from '../pagination/pagination';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { GUITARS_PER_PAGE } from '../../../const';
import MainSort from '../main-sort/main-sort';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../store/slices/filter-slice';
import qs from 'qs';
import MainFilter from '../main-filter/main-filter';
import { filterNonNull } from '../../../utils/utils';


function MainPageContent(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { currentPage } = useParams<{currentPage: string}>();


  const  guitars  = useAppSelector(({ DATA }) => DATA.guitars );
  const totalGuitarsLength = useAppSelector(({ DATA }) => DATA.guitars.length);

  const lastGuitarIndex = Number(currentPage) * GUITARS_PER_PAGE;
  const firstGuitarIndex = lastGuitarIndex - GUITARS_PER_PAGE;

  const currentSortType = useAppSelector(({ FILTER }) => FILTER.sortType);
  const currentOrderType = useAppSelector(({ FILTER }) => FILTER.sortOrder);
  const currentAcousticFilterType = useAppSelector(({ FILTER }) => FILTER.filterAcousticType);
  const currentElectricFilterType = useAppSelector(({ FILTER }) => FILTER.filterElectricType);
  const currentUkuleleFilterType = useAppSelector(({ FILTER }) => FILTER.filterUkuleleType);
  const currentFilterPriceLow = useAppSelector(({ FILTER }) => FILTER.filterPriceLow);
  const currentFilterPriceTop = useAppSelector(({ FILTER }) => FILTER.filterPriceTop);
  const currentFilterFourString = useAppSelector(({ FILTER }) => FILTER.filterFourString);
  const currentFilterSixString = useAppSelector(({ FILTER }) => FILTER.filteSixString);
  const currentFilterSevenString = useAppSelector(({ FILTER }) => FILTER.filterSevenString);
  const currentFilterTwelveString = useAppSelector(({ FILTER }) => FILTER.filterTwelveString);


  const cardsToRender = guitars.slice(firstGuitarIndex, lastGuitarIndex);


  if (!currentPage) {
    currentPage = '1';
  }


  useEffect(()=> {
    if (window.location.search)
    {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters(params),
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  useEffect(() => {
    if(!currentOrderType &&
      !currentSortType &&
      !currentAcousticFilterType &&
      !currentElectricFilterType &&
      !currentUkuleleFilterType &&
      !currentFilterPriceLow &&
      !currentFilterPriceTop &&
      !currentFilterFourString &&
      !currentFilterSixString &&
      !currentFilterSevenString &&
      !currentFilterTwelveString){
      dispatch(fetchGuitarsAction());
    }else {
      dispatch(fetchSortedGuitarsAction(`?${currentSortType ? `_sort=${currentSortType}` : ''}
${currentOrderType ? `&_order=${currentOrderType}` : ''}
${currentAcousticFilterType ? `&type=${currentAcousticFilterType}` : ''}
${currentElectricFilterType ? `&type=${currentElectricFilterType}` : ''}
${currentUkuleleFilterType ? `&type=${currentUkuleleFilterType}` : ''}
${currentFilterPriceLow ? `&price_gte=${currentFilterPriceLow}` : ''}
${currentFilterPriceTop ? `&price_lte=${currentFilterPriceTop}` : ''}
${currentFilterFourString ? `&stringCount=${currentFilterFourString}` : ''}
${currentFilterSixString ? `&stringCount=${currentFilterSixString}` : ''}
${currentFilterSevenString ? `&stringCount=${currentFilterSevenString}` : ''}
${currentFilterTwelveString ? `&stringCount=${currentFilterTwelveString}` : ''}`));
    }},
  [currentFilterPriceLow,
    currentFilterPriceTop,
    currentAcousticFilterType,
    currentElectricFilterType,
    currentUkuleleFilterType,
    currentOrderType,
    currentSortType,
    currentFilterFourString,
    currentFilterSixString,
    currentFilterSevenString,
    currentFilterTwelveString,
    dispatch]);

  useEffect(() =>{

    const queryString = qs.stringify(filterNonNull({
      currentOrderType : currentOrderType !== 'currentOrderType='? currentOrderType : '',
      currentSortType : currentSortType !== 'currentSortType=' ? currentSortType : '',
      currentFilterPriceLow : currentFilterPriceLow !== 'currentFilterPriceLow=' ? currentFilterPriceLow : '',
      currentFilterPriceTop : currentFilterPriceTop  !== 'currentFilterPriceTop=' ? currentFilterPriceTop : '',
      currentAcousticFilterType : currentAcousticFilterType === '' ?  '' : currentAcousticFilterType,
      currentElectricFilterType : currentElectricFilterType === '' ?  '' : currentElectricFilterType,
      currentUkuleleFilterType : currentUkuleleFilterType === '' ?  '' : currentUkuleleFilterType,
      currentFilterFourString : currentFilterFourString === '' ?  '' : currentFilterFourString,
      currentFilterSixString : currentFilterSixString === '' ?  '' : currentFilterSixString,
      currentFilterSevenString : currentFilterSevenString === '' ?  '' : currentFilterSevenString,
      currentFilterTwelveString : currentFilterTwelveString === '' ?  '' : currentFilterTwelveString,
    }),{ addQueryPrefix: true },
    );
    navigate(`${queryString}`);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentOrderType,
    currentSortType,
    currentAcousticFilterType,
    currentElectricFilterType,
    currentUkuleleFilterType,
    currentFilterPriceLow,
    currentFilterPriceTop,
    currentFilterFourString,
    currentFilterSixString,
    currentFilterSevenString,
    currentFilterTwelveString]);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs />
        <div className="catalog">
          <MainFilter />

          <MainSort />

          <CardsList cards={cardsToRender} />


          <Pagination totalGuitars={totalGuitarsLength} currentPage={Number(currentPage)}/>

        </div>
      </div>
    </main>);
}

export default MainPageContent;
