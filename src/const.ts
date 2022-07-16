export enum AppRoute {
    Main = '/main',
    CurrentMainPage = '/main/:currentPage',
    MainFirstPage = '/main/1',
    Guitar = '/guitars/:id/*',
    GuitarCharacteristics = '/guitars/:id/characteristics',
    GuitarDescription = '/guitars/:id/description',
    CartPage = '/cart',
    Item = '',
    NotFound = '/404',
  }

export enum APIRoute {
    Guitars = '/guitars',
    GuitarsAndComments = '/guitars?_embed=comments',
    GuitarAndComments = '/guitars/:id?_embed=comments',
    Guitar = '/guitars/:id',
    Reviews = '/comments',
    Coupon = '/coupons',
  }

export enum ApiType {
    FetchGuitars = 'data/fetchGuitars',
    FetchCurrentGuitar = 'data/fetchCurrentGuitar',
    FetchGuitarReviews = 'data/fetchGuitarReviews',
    PostReview = 'action/postReview',
    ChangeLoadingStatus='action/changeLoadingStatus',
    FetchCurrentGuitars = 'data/fetchCurrentGuitars',
    FetchSortedGuitars = 'data/fetchSortedGuitars',
    FetchSearchGuitars = 'data/FetchSearchGuitars',
    FetchTotal = 'data/FetchTotalMinAndMax',
    PostCoupon = 'action/postCoupon'
  }

export const GUITARS_PER_PAGE = 9;

export const fakeEmptyReviewPost = {
  guitarId: 0,
  userName: '',
  advantage: '',
  disadvantage: '',
  comment: '',
  rating: 0,
};

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
  comments: [],
};

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum SortType {
  Price= 'price',
  Rating= 'rating',
}

export enum OrderType {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum NameSpace {
  Data = 'DATA',
  Filter = 'FILTER',
}

export enum FilterType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
  Default = ''
}

export enum FilterString {
  Four = '4',
  Six = '6',
  Seven = '7',
  Twelve = '12',
  Default = '',
}

export const RATING_STARS=[
  1,2,3,4,5,
];

export enum QuantityChangeType {
  Plus = 'plus',
  Minus = 'minus',
}
