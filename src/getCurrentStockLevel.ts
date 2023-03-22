import path from "path";
import Stock from "./interfaces/stock.interface";
import Transaction from "./interfaces/transaction.interface";
import { dataReader } from "./utils/jsonFileReaderAdapter";
import { findStockBySku } from "./utils/findStockBySku";
import { filterTransactionsBySku } from "./utils/filterTransactionsBySku";
import { calculateTotalQty } from "./utils/calculateTotalQty";

const getCurrentStockLevel = async (
  sku: string
): Promise<{ sku: string; qty: number }> => {
  try {
    if (!sku || typeof sku !== "string" || sku.trim().length === 0) {
      throw new Error(`Invalid SKU: ${sku}`);
    }

    const STOCK_FILE: string = path.join(__dirname, "assets/stock.json");
    const TRANSACTIONS_FILE: string = path.join(
      __dirname,
      "assets/transactions.json"
    );

    const [stock, transactions] = await Promise.all([
      dataReader.readData(STOCK_FILE),
      dataReader.readData(TRANSACTIONS_FILE),
    ]);

    const skuStock = findStockBySku(stock as Stock[], sku);
    const skuTransactions = filterTransactionsBySku(
      transactions as Transaction[],
      sku
    );

    if (skuTransactions.length < 1 && !skuStock) {
      throw new Error(`SKU ${sku} does not exist in stock`);
    }

    const totalQty = calculateTotalQty(skuTransactions);

    const qty = skuStock ? skuStock.stock + totalQty : totalQty;

    return { sku, qty };
  } catch (err: unknown) {
    throw new Error(`Error getting current stock level for SKU ${sku}`);
  }
};

export default getCurrentStockLevel;
