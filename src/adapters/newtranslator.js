const base = 'https://translate.googleapis.com/translate_a/single';

const translate = {
  fetch: (text) => [
    `${base}?client=gtx&sl=ru&tl=en&dt=t&q=${encodeURI(text)}`,
  ],
  parse: (res) => {
    if (!Array.isArray(res)) {
      throw new Error('Invalid response format');
    }

    const translatedText = res && res[0] && res[0][0] && res[0].map((s) => s[0]).join('');


    if (!translatedText) {
      throw new Error('Translation not found');
    }

    return translatedText;
  },
};


export const translateText = async (text) => {
  try {
    const translationRequestUrl = translate.fetch(text);
    const response = await fetch(translationRequestUrl);

    if (!response.ok) {
      throw new Error('Translation request failed');
    }

    const jsonResponse = await response.json();
    const translatedText = translate.parse(jsonResponse);
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};
