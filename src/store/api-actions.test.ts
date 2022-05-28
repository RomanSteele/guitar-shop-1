import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import {
  fetchGuitarsAction,
  fetchReviewsAction,
  fetchCurrentGuitarAction,
  fetchCurrentGuitarsAction,
  postReview } from './api-actions';

import { loadGuitars, loadReviews, loadGuitar, loadCurrentGuitars, addReview } from './actions';
import { createApi } from '../services/api';
import { State } from '../types/store';
import { APIRoute } from '../const';
import { makeFakeGuitars, makeFakeReviewsByGuitar, makeFakeGuitar, fakeReviewPost } from '../utils/mocks/mocks';

describe('Async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const id = 1;
  const startId = 0;
  const lastId = 9;

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load Guitars when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars(27);

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitars.toString());
  });

  it(`should dispatch Load Reviews when GET /guitars/${id}/comments`, async () => {
    const mockReviews = makeFakeReviewsByGuitar(1);

    mockAPI
      .onGet(`${APIRoute.Guitars}/${id}/comments`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadReviews.toString());
  });

  it(`should dispatch Load Guitar when GET /guitars/${id}`, async () => {
    const mockGuitar = makeFakeGuitar();

    mockAPI
      .onGet(`${APIRoute.Guitars}/${id}`)
      .reply(200, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarAction(String(id)));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitar.toString());
  });

  it(`should dispatch Load Current Guitars when GET /guitars?_start=${startId}&_end=${lastId}`, async () => {
    const mockGuitars = makeFakeGuitars(9);

    mockAPI
      .onGet(`${APIRoute.Guitars}?_start=${startId}&_end=${lastId}`)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarsAction([0,9]));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentGuitars.toString());
  });

  it('should dispatch Review  when POST /comments', async () => {
    const mockGuitars = fakeReviewPost;

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(postReview(mockGuitars));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(addReview.toString());
  });
});
