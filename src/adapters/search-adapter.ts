
import { GuitarCard } from '../types/guitar';
import { loadSearchGuitars, setIsLoading } from '../store/slices/data-slice';
import { AppDispatch } from '../types/state';
import { translateText } from './newtranslator';

async function translateToEnglish(input: GuitarCard): Promise<GuitarCard> {
  try {
    const nameTranslation = await translateText(input.name);
    const descriptionTranslation = await translateText(input.description);

    return {
      ...input,
      name: nameTranslation,
      description: descriptionTranslation,
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

export async function searchGuitarsAdapterAndDispatch(
  dispatch: AppDispatch,
  guitarArray: GuitarCard[],
) {
  try {
    const translatedGuitarArray = await Promise.all(
      guitarArray.map(async (guitarInfo) => await translateToEnglish(guitarInfo)),
    );

    dispatch(loadSearchGuitars(translatedGuitarArray))&& dispatch(setIsLoading(false));

  } catch (error) {
    console.error('Translation error:', error);
  }
}
