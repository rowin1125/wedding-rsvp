export const capitalizeText = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const allWordsCapitalized = (text: string) =>
  text
    .split(' ')
    .map((word) => capitalizeText(word))
    .join(' ');
