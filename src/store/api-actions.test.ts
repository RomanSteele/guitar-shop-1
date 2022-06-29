import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import {
  fetchGuitarsAction,
  fetchCurrentGuitarAction,
  postReview,
  fetchGuitarsSearchAction,
  fetchTotalMinPrice,
  fetchTotalMaxPrice} from './api-actions';

import { loadGuitars, loadGuitar, addComment, loadSearchGuitars } from './slices/data-slice';
import {setTotalMinPrice, setTotalMaxPrice} from './slices/filter-slice';
import { createApi } from '../services/api';
import { State } from '../types/state';
import { APIRoute } from '../const';
import { makeFakeGuitars, makeFakeGuitar, fakeReviewPost, fakeSortString } from '../utils/mocks/mocks';

describe('Async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const id = 1;
  const item = '00';
  const search = fakeSortString;

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load Guitars when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars(27);

    mockAPI
      .onGet(APIRoute.GuitarsAndComments)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitars.toString());
  });


  it(`should dispatch Load Guitar when GET /guitars/${id}?_embed=comments`, async () => {
    const mockGuitar = makeFakeGuitar();

    mockAPI
      .onGet(`${APIRoute.GuitarAndComments.replace(':id', id.toString())}`)
      .reply(200, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarAction(String(id)));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitar.toString());
  });


  it('should dispatch Review  when POST /comments', async () => {
    const mockReview = fakeReviewPost;

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, mockReview);

    const store = mockStore();
    await store.dispatch(postReview(mockReview));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(addComment.toString());
  });

  it(`should dispatch Load Search Guitars when GET /guitars?name_like=${item}`, async () => {
    const mockGuitars = makeFakeGuitars(27);

    mockAPI
      .onGet(`${APIRoute.Guitars}?name_like=${item}`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsSearchAction(item));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadSearchGuitars.toString());
  });

  it(`should dispatch Load Sorted Guitars when GET /guitars?filter=${search}&_embed=comments`, async () => {
    const mockGuitars = makeFakeGuitars(27);

    mockAPI
      .onGet(`${APIRoute.Guitars}?filter=${search}&_embed=comments`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch min price of Guitars when GET /guitars?_sort=price&_order=asc', async () => {
    const mockGuitars = makeFakeGuitars(27);

    mockAPI
      .onGet(`${APIRoute.Guitars}?_sort=price&_order=asc`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchTotalMinPrice());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setTotalMinPrice.toString());
  });

  it('should dispatch max price of Guitars when GET /guitars?_sort=price&_order=desc', async () => {
    const mockGuitars = makeFakeGuitars(27);

    mockAPI
      .onGet(`${APIRoute.Guitars}?_sort=price&_order=desc`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchTotalMaxPrice());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setTotalMaxPrice.toString());
  });
},
);
