import Stock from "../interfaces/stock.interface";

export const findStockBySku = (
  stock: Stock[],
  sku: string
): Stock | undefined => {
  return stock.find((item) => item.sku === sku);
};
