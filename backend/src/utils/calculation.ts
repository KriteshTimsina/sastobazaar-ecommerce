export const getDiscountPercent = (discount: number, price: number) => {
  if (discount === 0) return 0;

  return Math.ceil((discount / price) * 100);
};
