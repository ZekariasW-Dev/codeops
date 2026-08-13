// ============================================================
// report.js — Summary Functions
// ============================================================

// Total by type using filter + reduce
export function totalByType(transactions, type) {
    return transactions
        .filter(t => t.type === type)
        .reduce((sum, { amount }) => sum + amount, 0);
}

// Format receipts using map with destructuring
export function formatReceipts(transactions) {
    return transactions.map(({ id, customer, amount, type }) => {
        const emoji = type === 'credit' ? '📈' : '📉';
        return `${emoji} Receipt #${id}: ${customer} — ${amount} ETB (${type})`;
    });
}

// Get transaction by id (spread copy)
export function getTransactionById(transactions, id) {
    const found = transactions.find(t => t.id === id);
    return found ? { ...found } : null;
}

// Add transaction using spread
export function addTransaction(transactions, newTransaction) {
    return [...transactions, newTransaction];
}

// Update transaction using spread
export function updateTransaction(transactions, id, updates) {
    return transactions.map(t =>
        t.id === id ? { ...t, ...updates } : t
    );
}

// Export all as default
export default {
    totalByType,
    formatReceipts,
    getTransactionById,
    addTransaction,
    updateTransaction
};