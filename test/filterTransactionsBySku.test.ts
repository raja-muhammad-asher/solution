import { filterTransactionsBySku } from "../src/utils/filterTransactionsBySku";

import Transaction from "../src/interfaces/transaction.interface";

describe("filterTransactionsBySku", () => {
  const transactions: Transaction[] = [
    { sku: "123", type: "order", qty: 10 },
    { sku: "456", type: "refund", qty: 20 },
    { sku: "789", type: "order", qty: 30 },
    { sku: "456", type: "order", qty: 10 },
  ];

  test("should return transactions when found", () => {
    expect(filterTransactionsBySku(transactions, "456")).toEqual([
      { sku: "456", type: "refund", qty: 20 },
      { sku: "456", type: "order", qty: 10 },
    ]);
  });

  test("returns an empty array when no transactions match", () => {
    expect(filterTransactionsBySku(transactions, "987")).toEqual([]);
  });
});
