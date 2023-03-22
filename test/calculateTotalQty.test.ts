import { calculateTotalQty } from "../src/utils/calculateTotalQty";
import Transaction from "../src/interfaces/transaction.interface";

describe('calculateTotalQty', () => {
    test('should return 0 for empty transactions array', () => {
      const transactions: Transaction[] = [];
      const result = calculateTotalQty(transactions);
      expect(result).toBe(0);
    });
  
    test('should return correct total quantity for order transactions', () => {
      const transactions: Transaction[] = [
        { sku: '123', type: 'order', qty: 10 },
        { sku: '123', type: 'order', qty: 5 },
        { sku: '123', type: 'order', qty: 2 },
      ];
      const result = calculateTotalQty(transactions);
      expect(result).toBe(-17);
    });
  
    test('should return correct total quantity for refund transactions', () => {
      const transactions: Transaction[] = [
        { sku: '456', type: 'refund', qty: 10 },
        { sku: '456', type: 'refund', qty: 5 },
        { sku: '456', type: 'refund', qty: 2 },
      ];
      const result = calculateTotalQty(transactions);
      expect(result).toBe(17);
    });
  
    test('should ignore other transaction types', () => {
      const transactions: Transaction[] = [
        { sku: '789', type: 'order', qty: 10 },
        { sku: '789', type: 'refund', qty: 5 },
        // @ts-expect-error
        { sku: '789', type: 'unknown', qty: 2 },
      ];
      const result = calculateTotalQty(transactions);
      expect(result).toBe(-5);
    });
});