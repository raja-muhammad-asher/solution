export const calculateTotalQty = (transactions) => {
    return transactions.reduce((total, item) => {
        if (item.type === "order") {
            return total - item.qty;
        }
        else if (item.type === "refund") {
            return total + item.qty;
        }
        else {
            return total;
        }
    }, 0);
};
