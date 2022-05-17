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
    Reviews = '/guitars'
  }

export enum ApiType {
    FetchGuitars = 'data/fetchGuitars',
    FetchCurrentGuitar = 'data/fetchCurrentGuitar',
    FetchGuitarReviews = 'data/fetchGuitarReviews',
    PostFeedback = 'action/postFeedback'
  }
