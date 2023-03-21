import { promises as fs } from "fs";
import Stock from "../interfaces/stock.interface";

interface StockReaderAdapter {
  readData(filePath: string): Promise<Stock[]>;
}

class StockFileReaderAdapter implements StockReaderAdapter {
  async readData(filePath: string): Promise<Stock[]> {
    const fileData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  }
}

export const dataStockReader: StockReaderAdapter = new StockFileReaderAdapter();
