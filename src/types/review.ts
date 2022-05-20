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

export type ReviewPost ={
        guitarId: number,
        userName: string,
        advantage: string,
        disadvantage: string,
        comment: string,
        rating: number,
        };
