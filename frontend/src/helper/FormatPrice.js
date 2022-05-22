// eslint-disable-next-line import/prefer-default-export
export const formatPrice = (price) => `$${price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')}`;
