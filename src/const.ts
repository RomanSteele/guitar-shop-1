export enum AppRoute {
    Main = '/main',
    CurrentMainPage = '/main/:id',
    Guitar = '/guitars/:id',
    Item = '',
    NotFound = '/404',
  }

export enum APIRoute {
    Guitars = '/guitars',
    Guitar = '/guitars/',
    Reviews = '/comments',
  }

export enum ApiType {
    FetchGuitars = 'data/fetchGuitars',
    FetchCurrentGuitar = 'data/fetchCurrentGuitar',
    FetchGuitarReviews = 'data/fetchGuitarReviews',
    PostReview = 'action/postReview',
    ChangeLoadingStatus='action/changeLoadingStatus'
  }

