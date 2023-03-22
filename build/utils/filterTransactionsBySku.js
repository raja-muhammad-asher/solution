export const filterTransactionsBySku = (transactions, sku) => {
    return transactions.filter((item) => item.sku === sku);
};
