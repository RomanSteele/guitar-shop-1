
import { GuitarCards } from '../types/guitar';
import { loadGuitar, setIsLoading } from '../store/slices/data-slice';
import { AppDispatch } from '../types/state';
import { Review } from '../types/review';
import { translateText } from './newtranslator';
import { currencyChange } from '../utils/utils';

async function translateReview(review: Review): Promise<Review> {
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

async function translateToEnglish(input: GuitarCards): Promise<GuitarCards> {
  try {
    const nameTranslation = await translateText(input.name);
    const descriptionTranslation = await translateText(input.description);
    const priceCurrencyChange = currencyChange(input.price);

    const translatedReviews = await Promise.all(
      input.comments.map(async (review) => await translateReview(review)),
    );

    return {
      ...input,
      name: nameTranslation,
      description: descriptionTranslation,
      comments:translatedReviews,
      price: priceCurrencyChange,
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

export async function currentGuitarAdapterAndDispatch(dispatch: AppDispatch, guitarInfo: GuitarCards) {
  try {
    const russianData: GuitarCards = await translateToEnglish(guitarInfo);

    dispatch(loadGuitar(russianData)) && dispatch(setIsLoading(false));
  } catch (error) {
    console.error('Translation error:', error);
  }
}
