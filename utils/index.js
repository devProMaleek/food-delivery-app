export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

export const capitalizeWord = (text) => {
  const words = text.split(' ');

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const capitalizedText = capitalizedWords.join(' ');
  return capitalizedText;
};
