import { findStockBySku } from "../src/utils/findStockBySku";
import Stock from "../src/interfaces/stock.interface";

describe('findStockBySku', () => {
  const stocks: Stock[] = [
    { sku: '123', stock: 10 },
    { sku: '456', stock: 20 },
    { sku: '789', stock: 30 },
  ];

  test('should return undefined when stock is not found', () => {
    expect(findStockBySku(stocks, '999')).toBeUndefined();
  });
  
  test('should return stock when stock is found', () => {
    expect(findStockBySku(stocks, '123')).toEqual({ sku: '123', stock: 10 });
  });
  
  test('should return undefined when stock is empty', () => {
    expect(findStockBySku([], '123')).toBeUndefined();
  });

  test('should throw an error for null stock', () => {
    // @ts-expect-error
    expect(() => findStockBySku(null, '001')).toThrowError(Error);
  });

  test('should throw an error for not passing stock and sku', () => {
    // @ts-expect-error
    expect(() => findStockBySku()).toThrowError(Error);
  });

  test('throws an error when sku is invalid', () => {
    // @ts-expect-error
    expect(() => findStockBySku(stocks, null)).toThrowError(Error);
    expect(() => findStockBySku(stocks, '')).toThrowError(Error);
    // @ts-expect-error
    expect(() => findStockBySku(stocks, 123)).toThrowError(Error);
  });
});