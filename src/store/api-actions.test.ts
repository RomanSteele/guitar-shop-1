import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import {
  fetchGuitarsAction,
  fetchCurrentGuitarAction,
  postReview } from './api-actions';

import { loadGuitars, loadGuitar, addComment } from './actions';
import { createApi } from '../services/api';
import { State } from '../types/store';
import { APIRoute } from '../const';
import { makeFakeGuitars, makeFakeGuitar, fakeReviewPost } from '../utils/mocks/mocks';

describe('Async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const id = 1;

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
});
