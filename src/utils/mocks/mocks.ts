import { GuitarCard } from '../../types/guitar';
import {  Reviews, ReviewsByGuitar } from '../../types/review';


export const makeFakeGuitars = (quantity: number): GuitarCard[] => (
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
    }
  ))
);

export const makeFakeGuitar = (): GuitarCard => (
  {
    id: Math.floor(Math.random() * 10000),
    name: 'fake',
    vendorCode: 'fake',
    type: 'fake',
    description: 'fake',
    previewImg: '/img.jpg',
    stringCount: 4,
    rating: 3,
    price: 12,
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

export const makeFakeReviewsByGuitar = (guitarId: number): ReviewsByGuitar => (
  {
    [guitarId]: makeFakeReviews(guitarId),
  }
);

export const fakeReviewGet = {
  id: 1,
  userName: 'fake',
  advantage: 'fake',
  disadvantage: 'fake',
  comment: 'fake',
  rating: 5,
  createAt: '',
  guitarId: 0,
};

export const fakeReviewPost ={
  guitarId: 1,
  userName: 'fake',
  advantage: 'fake',
  disadvantage: 'fake',
  comment: 'fake',
  rating: 5,
};

export const fakeEmptyGuitar ={
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
