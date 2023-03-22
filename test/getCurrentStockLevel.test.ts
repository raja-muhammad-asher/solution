import getCurrentStockLevel from "../src/getCurrentStockLevel";

describe("getCurrentStockLevel", () => {
  test("should return { sku: 'LTV719449/39/39', qty: 8510 } for getCurrentStockLevel('LTV719449/39/39')", async () => {
    expect(await getCurrentStockLevel("LTV719449/39/39")).toStrictEqual({
      sku: "LTV719449/39/39",
      qty: 8510,
    });
  });

  test("getCurrentStockLevel throws error for non-existent SKU", () => {
    expect(
      async () => await getCurrentStockLevel("LXY719449/69/93")
    ).rejects.toThrow(Error);
  });

  test("getCurrentStockLevel throws error for null SKU", () => {
    expect(
      // @ts-expect-error
      async () => await getCurrentStockLevel(null)
    ).rejects.toThrow(Error);
  });  

  test("getCurrentStockLevel throws error for numeric SKU", () => {
    expect(
      // @ts-expect-error
      async () => await getCurrentStockLevel(123)
    ).rejects.toThrow(Error);
  }); 

  test("getCurrentStockLevel throws error for object SKU", () => {
    expect(
      // @ts-expect-error
      async () => await getCurrentStockLevel({sku: 123})
    ).rejects.toThrow(Error);
  }); 

  test("getCurrentStockLevel throws error for not passing SKU", () => {
    expect(
      // @ts-expect-error
      async () => await getCurrentStockLevel()
    ).rejects.toThrow(Error);
  }); 

  test("getCurrentStockLevel throws error for empty string SKU", () => {
    expect(
      async () => await getCurrentStockLevel("")
    ).rejects.toThrow(Error);
  }); 

  // For this test case I have removed the last entry from stock.json to test it
  // SKU not present in stock.json but have entry in transactions.json
  test("should return { sku: 'HGG795032/35/91', qty: -30 } for getCurrentStockLevel('HGG795032/35/91')", async () => {
    expect(await getCurrentStockLevel("HGG795032/35/91")).toStrictEqual({
      sku: "HGG795032/35/91",
      qty: -30,
    });
  });

  // For this test case I have made qty 0 for sku CLQ274846/07/46
  test("should return { sku: 'CLQ274846/07/46', qty: -45 } for getCurrentStockLevel('CLQ274846/07/46') for stock qty 0", async () => {
    expect(await getCurrentStockLevel("CLQ274846/07/46")).toStrictEqual({
      sku: "CLQ274846/07/46",
      qty: -45,
    });
  });

  // For this test case I have removed transactions for SXB930757/87/87 and added a fake transaction
  // that doesn't include order or refund
  test("should return { sku: 'SXB930757/87/87', qty: 3552 } for getCurrentStockLevel('SXB930757/87/87') for 0 transactions", async () => {
    expect(await getCurrentStockLevel("SXB930757/87/87")).toStrictEqual({
      sku: "SXB930757/87/87",
      qty: 3552,
    });
  });
});
