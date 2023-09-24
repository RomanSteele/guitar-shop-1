
import { GuitarCard } from '../types/guitar';
import { loadGuitars, setIsLoading } from '../store/slices/data-slice';
import { AppDispatch } from '../types/state';
import { translateText } from './newtranslator';
import { currencyChange } from '../utils/utils';


async function translateToEnglish(input: GuitarCard): Promise<GuitarCard> {
  try {
    const nameTranslation = await translateText(input.name);
    const descriptionTranslation = await translateText(input.description);
    const priceCurrencyChange = currencyChange(input.price);

    return {
      ...input,
      name: nameTranslation,
      description: descriptionTranslation,
      price: priceCurrencyChange,
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

export async function guitarsAdapterAndDispatch(
  dispatch: AppDispatch,
  guitarArray: GuitarCard[],
) {
  try {
    const translatedGuitarArray = await Promise.all(
      guitarArray.map(async (guitarInfo) => await translateToEnglish(guitarInfo)),
    );
    return dispatch(loadGuitars(translatedGuitarArray)) && dispatch(setIsLoading(false));
  } catch (error) {
    console.error('Translation error:', error);
  }
}
