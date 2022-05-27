export enum AppRoute {
    Main = '/main',
    CurrentMainPage = '/main/:currentPage',
    MainFirstPage = '/main/1',
    Guitar = '/guitars/:id',
    GuitarCharacteristics = '/guitars/:id/characteristics',
    GuitarDescription = '/guitars/:id/description',
    Item = '',
    NotFound = '/404',
  }

export enum APIRoute {
    Guitars = '/guitars',
    Guitar = '/guitars/:id',
    Reviews = '/comments',
  }

export enum ApiType {
    FetchGuitars = 'data/fetchGuitars',
    FetchCurrentGuitar = 'data/fetchCurrentGuitar',
    FetchGuitarReviews = 'data/fetchGuitarReviews',
    PostReview = 'action/postReview',
    ChangeLoadingStatus='action/changeLoadingStatus',
    FetchCurrentGuitars = 'data/fetchCurrentGuitars',
  }

export const GUITARS_PER_PAGE = 9;

export const InitialGuitar = {
  id: 0,
  name: '',
  vendorCode: '',
  type: '',
  description: '',
  previewImg: '',
  stringCount: 0,
  rating: 0,
  price: 0,
};
