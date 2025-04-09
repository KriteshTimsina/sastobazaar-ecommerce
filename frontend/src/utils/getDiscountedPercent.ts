export const getDiscountedPercent = (price: number, discountedPrice: number) => {
  return Math.ceil(((price - discountedPrice) / price) * 100);
};
