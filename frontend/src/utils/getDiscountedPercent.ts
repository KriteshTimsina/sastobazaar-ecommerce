export const getDiscountedPercent = (price: number, discountedPrice: number) => {
  if (discountedPrice === 0) return 0;
  return Math.ceil(((price - discountedPrice) / price) * 100);
};
