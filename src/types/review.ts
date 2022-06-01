export type Review = {
        id: string,
        userName: string,
        advantage: string,
        disadvantage: string,
        comment: string,
        rating: number,
        createAt: string,
        guitarId: number,
        }

export type Reviews = Review[];

export type ReviewPost ={
        guitarId: number,
        userName: string,
        advantage: string,
        disadvantage: string,
        comment: string,
        rating: number,
        };

export type ReviewsByGuitar = Record<number, Review[]>;

export type NewReviewPost ={
        guitarId: number,
        userName: string,
        advantage: string,
        disadvantage: string,
        comment: string,
        rating: number,
        createAt: string,
        id: string,
        };
