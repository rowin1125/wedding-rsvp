export const truncateText = (text?: string, length = 10, end = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;

  return text.slice(0, length) + end;
};
