var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "path";
import { dataReader } from "./utils/jsonFileReaderAdapter";
import { findStockBySku } from "./utils/findStockBySku";
import { filterTransactionsBySku } from "./utils/filterTransactionsBySku";
import { calculateTotalQty } from "./utils/calculateTotalQty";
const getCurrentStockLevel = (sku) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!sku || typeof sku !== "string" || sku.trim().length === 0) {
            throw new Error(`Invalid SKU: ${sku}`);
        }
        const STOCK_FILE = path.join(__dirname, "assets/stock.json");
        const TRANSACTIONS_FILE = path.join(__dirname, "assets/transactions.json");
        const [stock, transactions] = yield Promise.all([
            dataReader.readData(STOCK_FILE),
            dataReader.readData(TRANSACTIONS_FILE),
        ]);
        const skuStock = findStockBySku(stock, sku);
        const skuTransactions = filterTransactionsBySku(transactions, sku);
        if (skuTransactions.length < 1 && !skuStock) {
            throw new Error(`SKU ${sku} does not exist in stock`);
        }
        const totalQty = calculateTotalQty(skuTransactions);
        const qty = skuStock ? skuStock.stock + totalQty : totalQty;
        return { sku, qty };
    }
    catch (err) {
        throw new Error(`Error getting current stock level for SKU ${sku}`);
    }
});
export default getCurrentStockLevel;
