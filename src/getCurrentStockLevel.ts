import path from "path";
import { dataStockReader } from "./utils/stockFileReaderAdapter";
import { dataTransReader } from "./utils/transFileReaderAdapter";
import { findStockBySku } from "./utils/findStockBySku";
import { filterTransactionsBySku } from "./utils/filterTransactionsBySku";
import { calculateTotalQty } from "./utils/calculateTotalQty";

const getCurrentStockLevel = async (
  sku: string
): Promise<{ sku: string; qty: number }> => {
  if (!sku || typeof sku !== "string" || sku.trim().length === 0) {
    throw new Error(`Invalid SKU: ${sku}`);
  }

  const STOCK_FILE: string = path.join(__dirname, "assets/stock.json");
  const TRANSACTIONS_FILE: string = path.join(
    __dirname,
    "assets/transactions.json"
  );

  try {
    const [stock, transactions] = await Promise.all([
      dataStockReader.readData(STOCK_FILE),
      dataTransReader.readData(TRANSACTIONS_FILE),
    ]);

    const skuStock = findStockBySku(stock, sku);
    const skuTransactions = filterTransactionsBySku(transactions, sku);

    if (skuTransactions.length < 1 && !skuStock) {
      throw new Error(`SKU ${sku} does not exist in stock`);
    }

    const totalQty = calculateTotalQty(skuTransactions);

    const qty = skuStock ? skuStock.stock + totalQty : totalQty;

    return { sku, qty };
  } catch (err: any) {
    throw new Error(
      `Error getting current stock level for SKU ${sku}: ${err.message}`
    );
  }
};

export default getCurrentStockLevel;
