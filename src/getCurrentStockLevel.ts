import { promises as fs } from 'fs';
import path from 'path';

const getCurrentStockLevel = async (sku: string): Promise<{ sku: string, qty: number }> => {
  const STOCK_FILE: string = path.join(__dirname, 'assets/stock.json');
  const TRANSACTIONS_FILE: string = path.join(__dirname, 'assets/transactions.json');

  interface Transaction {
    sku: string;
    type: 'order' | 'refund';
    qty: number;
  }

  interface Stock {
    sku: string;
    stock: number;
  }

  try {
    const [stockData, transactionsData] = await Promise.all([
      fs.readFile(STOCK_FILE, 'utf-8'),
      fs.readFile(TRANSACTIONS_FILE, 'utf-8')
    ]);

    const stock: Stock[] = JSON.parse(stockData);
    const transactions: Transaction[] = JSON.parse(transactionsData);

    let skuStock = stock.find(item => item.sku === sku);
    const skuTransactions = transactions.filter(item => item.sku === sku);
    if (skuTransactions.length < 1 && !skuStock) {
      throw new Error(`SKU ${sku} does not exist in stock`);
    }

    if(!skuStock) {
      skuStock = { sku: sku, stock: 0};
    }

    const totalQty = skuTransactions.reduce((total, item) => {
      if (item.type === 'order') {
        return total - item.qty;
      } else if (item.type === 'refund') {
        return total + item.qty;
      } else {
        return total;
      }
    }, 0);

    return { sku: skuStock.sku, qty: skuStock.stock + totalQty };
  } catch (err: any) {
    throw new Error(`Error getting current stock level for SKU ${sku}: ${err.message}`);
  }
}

export default getCurrentStockLevel;
