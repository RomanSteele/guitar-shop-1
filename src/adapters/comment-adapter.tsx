
import { addComment, setIsLoading } from '../store/slices/data-slice';
import { AppDispatch } from '../types/state';
import { NewReviewPost } from '../types/review';
import { translateText } from './newtranslator';


async function translatePostReview(review: NewReviewPost): Promise<NewReviewPost> {
  try {
    const nameTranslation = await translateText(review.userName);
    const advantageTranslation = await translateText(review.advantage);
    const disadvantageTranslation = await translateText(review.disadvantage);
    const commentTranslation = await translateText(review.comment);

    return {
      ...review,
      userName: nameTranslation,
      advantage: advantageTranslation,
      disadvantage: disadvantageTranslation,
      comment: commentTranslation,
    };
  } catch (error) {
    console.error('Translation error for review:', error);
    throw error;
  }
}

export async function postReviewAdapterAndDispatch(
  dispatch: AppDispatch,
  postReview: NewReviewPost,
) {
  try {
    const russianData: NewReviewPost = await translatePostReview(postReview);
    dispatch(addComment(russianData)) && dispatch(setIsLoading(false));
  } catch (error) {
    console.error('Translation error:', error);
  }
}
