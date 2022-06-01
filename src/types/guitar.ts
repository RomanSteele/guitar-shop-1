import { Reviews } from './review';

export type GuitarCard = {
    id: number,
    name: string,
    vendorCode: string,
    type: string,
    description: string,
    previewImg: string,
    stringCount: number,
    rating: number,
    price: number,
    }

export type GuitarCards = {
        id: number,
        name: string,
        vendorCode: string,
        type: string,
        description: string,
        previewImg: string,
        stringCount: number,
        rating: number,
        price: number,
        comments: Reviews,
        }
