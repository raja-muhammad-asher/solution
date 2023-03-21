import Transaction from "../interfaces/transaction.interface";

export const filterTransactionsBySku = (
  transactions: Transaction[],
  sku: string
): Transaction[] => {
  return transactions.filter((item) => item.sku === sku);
};
