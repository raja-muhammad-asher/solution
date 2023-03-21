var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises as fs } from "fs";
import path from "path";
const getCurrentStockLevel = (sku) => __awaiter(void 0, void 0, void 0, function* () {
    const STOCK_FILE = path.join(__dirname, "assets/stock.json");
    const TRANSACTIONS_FILE = path.join(__dirname, "assets/transactions.json");
    try {
        const [stockData, transactionsData] = yield Promise.all([
            fs.readFile(STOCK_FILE, "utf-8"),
            fs.readFile(TRANSACTIONS_FILE, "utf-8"),
        ]);
        const stock = JSON.parse(stockData);
        const transactions = JSON.parse(transactionsData);
        let skuStock = stock.find((item) => item.sku === sku);
        const skuTransactions = transactions.filter((item) => item.sku === sku);
        if (skuTransactions.length < 1 && !skuStock) {
            throw new Error(`SKU ${sku} does not exist in stock`);
        }
        if (!skuStock) {
            skuStock = { sku: sku, stock: 0 };
        }
        const totalQty = skuTransactions.reduce((total, item) => {
            if (item.type === "order") {
                return total - item.qty;
            }
            else if (item.type === "refund") {
                return total + item.qty;
            }
            else {
                return total;
            }
        }, 0);
        return { sku: skuStock.sku, qty: skuStock.stock + totalQty };
    }
    catch (err) {
        throw new Error(`Error getting current stock level for SKU ${sku}: ${err.message}`);
    }
});
export default getCurrentStockLevel;
