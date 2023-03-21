import { promises as fs } from "fs";
import Transaction from "../interfaces/transaction.interface";

interface TransReaderAdapter {
  readData(filePath: string): Promise<Transaction[]>;
}

class TransFileReaderAdapter implements TransReaderAdapter {
  async readData(filePath: string): Promise<Transaction[]> {
    const fileData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  }
}

export const dataTransReader: TransReaderAdapter = new TransFileReaderAdapter();
