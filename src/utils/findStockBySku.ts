import Stock from "../interfaces/stock.interface";

export const findStockBySku = (
  stock: Stock[],
  sku: string
): Stock | undefined => {
  try {
    if (!sku || typeof sku !== "string" || sku.trim().length === 0) {
      throw new Error(`Invalid sku: ${sku}`);
    }

    if (!stock) {
      throw new Error(`Invalid stock: ${stock}`);
    }

    return stock.find((item) => item.sku === sku);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`Error finding stock by sku: ${err.message}`);
    }
  }
};
