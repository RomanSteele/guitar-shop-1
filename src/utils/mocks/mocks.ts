import { GuitarCards } from '../../types/guitar';
import {  Reviews } from '../../types/review';


export const makeFakeGuitars = (quantity: number): GuitarCards[] => (
  new Array(quantity).fill(null).map(() => (
    {
      id: Math.floor(Math.random() * 10000),
      name: 'fake',
      vendorCode: 'fake',
      type: 'fake',
      description: 'fake',
      previewImg: '/img.jpg',
      stringCount: 1,
      rating: 1,
      price: 12,
      comments: makeFakeReviews(3),
    }
  ))
);

export const makeFakeGuitar = (): GuitarCards => (
  {
    id: Math.floor(Math.random() * 10000),
    name: 'fake',
    vendorCode: 'fakeGuitar',
    type: 'fake',
    description: 'fakeDescription',
    previewImg: '/img.jpg',
    stringCount: 4,
    rating: 3,
    price: 12,
    comments: makeFakeReviews(5),
  }
);

export const makeFakeReviews = (guitarId: number): Reviews => (
  new Array(10).fill(null).map(() => (
    {
      id: Math.floor(Math.random() * 10000).toString() ,
      userName: 'fake',
      advantage: 'fake',
      disadvantage: 'fake',
      comment: 'fake',
      rating: 4,
      createAt: 'fake',
      guitarId: guitarId,
    }
  ))
);


export const fakeReviewPost ={
  guitarId: 1,
  userName: 'fake',
  advantage: 'fake',
  disadvantage: 'fake',
  comment: 'fake',
  rating: 5,
  createAt: Date(),
  id: '1111',
};


export const fakeSortString = 'acoustic';

export const fakeStringCount = '7';
