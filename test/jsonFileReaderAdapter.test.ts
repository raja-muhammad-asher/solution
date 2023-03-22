import { promises as fs } from "fs";
import { dataReader } from "../src/utils/jsonFileReaderAdapter";

describe("jsonFileReaderAdapter", () => {
    const filePath = "./data.json";

    beforeAll(async () => {
      // Create a test data file
      const testData = { name: "Test", age: 30 };
      await fs.writeFile(filePath, JSON.stringify(testData));
    });

    afterAll(async () => {
      // Remove the test data file
      await fs.unlink(filePath);
    });

    test("should return the correct data when reading a JSON file", async () => {
      const expectedData = { name: "Test", age: 30 };
      const result = await dataReader.readData("./data.json");
      expect(result).toEqual(expectedData);
    });
  
    test("should throw an error when trying to read a non-existent file", async () => {
      const nonExistentFilePath = "./non-existent.json";
      await expect(dataReader.readData(nonExistentFilePath)).rejects.toThrow();
    });

    test("should throw an error for null filePath", async () => {
        const filePath = null;
        // @ts-expect-error
        await expect(dataReader.readData(filePath)).rejects.toThrow(Error);
    });

    test("should throw an error for undefined filePath", async () => {
        // @ts-expect-error
        await expect(dataReader.readData(undefined)).rejects.toThrow(Error);
    });

    test("should throw an error for numeric filePath", async () => {
        const filePath = 123;
        // @ts-expect-error
        await expect(dataReader.readData(filePath)).rejects.toThrow(Error);
    });

    test("should throw an error for object filePath", async () => {
        const filePath = {filePath: 123};
        // @ts-expect-error
        await expect(dataReader.readData(filePath)).rejects.toThrow(Error);
    });

    test("should throw an error for not passing filePath", async () => {
        // @ts-expect-error
        await expect(dataReader.readData()).rejects.toThrow(Error);
    });

    test("should throw an error for empty string filePath", async () => {
        const filePath = "";
        await expect(dataReader.readData(filePath)).rejects.toThrow(Error);
    });
});