export enum AppRoute {
    Main = '/main',
    CurrentMainPage = '/main/:id',
    Guitars = '/guitars/:id',
    Item = '',
    NotFound = '/404',
  }

export enum APIRoute {
    Guitars = '/guitars',
    Guitar = '/guitars/',
  }

export enum ApiType {
    FetchGuitars = 'data/fetchGuitars',
    FetchCurrentGuitar = 'data/fetchCurrentGuitar',
    PostFeedback = 'action/postFeedback'
  }
