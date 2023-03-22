import { promises as fs } from "fs";

interface FileReaderAdapter {
  readData(filePath: string): Promise<object>;
}

class JsonFileReaderAdapter implements FileReaderAdapter {
  async readData(filePath: string): Promise<object> {
    try {
      if (
        !filePath ||
        typeof filePath !== "string" ||
        filePath.trim().length === 0
      ) {
        throw new Error(`Invalid filePath: ${filePath}`);
      }
      const fileData = await fs.readFile(filePath, "utf-8");
      return JSON.parse(fileData);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error reading file ${filePath}: ${err.message}`);
      }
      throw err;
    }
  }
}

export const dataReader: FileReaderAdapter = new JsonFileReaderAdapter();
