// ============================================================
// app.js — Main Application
// ============================================================

import { transactions } from './transactions.js';
import {
    totalByType,
    formatReceipts,
    getTransactionById,
    addTransaction,
    updateTransaction
} from './report.js';

// ============================================================
// 1. DISPLAY SUMMARY
// ============================================================

const totalCredits = totalByType(transactions, 'credit');
const totalDebits = totalByType(transactions, 'debit');

document.getElementById('summary').innerHTML = `
    <div class="card green">
        <div class="flex">
            <strong>💰 Total Credits:</strong>
            <span style="font-size:1.2rem; font-weight:bold;">${totalCredits} ETB</span>
        </div>
        <small>${transactions.filter(t => t.type === 'credit').length} transactions</small>
    </div>
    <div class="card red">
        <div class="flex">
            <strong>💳 Total Debits:</strong>
            <span style="font-size:1.2rem; font-weight:bold;">${totalDebits} ETB</span>
        </div>
        <small>${transactions.filter(t => t.type === 'debit').length} transactions</small>
    </div>
    <div class="card gold">
        <div class="flex">
            <strong>📊 Net Balance:</strong>
            <span style="font-size:1.2rem; font-weight:bold;">${totalCredits - totalDebits} ETB</span>
        </div>
    </div>
`;

// ============================================================
// 2. DISPLAY RECEIPTS
// ============================================================

const receipts = formatReceipts(transactions);
let receiptsHtml = '<div class="card">';
receipts.forEach(receipt => {
    receiptsHtml += `<div class="receipt-item">${receipt}</div>`;
});
receiptsHtml += '</div>';
document.getElementById('receipts').innerHTML = receiptsHtml;

// ============================================================
// 3. DISPLAY TRANSACTIONS
// ============================================================

let transactionsHtml = '<div class="card">';
transactions.forEach(t => {
    const badge = t.type === 'credit'
        ? '<span class="badge green">Credit</span>'
        : '<span class="badge red">Debit</span>';
    transactionsHtml += `
        <div class="transaction-item">
            <span><strong>#${t.id}</strong> ${badge} ${t.customer}</span>
            <span style="font-weight:bold;">${t.amount} ETB</span>
        </div>
    `;
});
transactionsHtml += '</div>';
document.getElementById('transactions').innerHTML = transactionsHtml;

// ============================================================
// 4. CONSOLE OUTPUT
// ============================================================

console.log('=== TELEBIRR TRANSACTION REPORT ===\n');

console.log('📊 SUMMARY:');
console.log(`  Total Credits: ${totalCredits} ETB`);
console.log(`  Total Debits: ${totalDebits} ETB`);
console.log(`  Net Balance: ${totalCredits - totalDebits} ETB\n`);

console.log('🧾 RECEIPTS:');
const receiptList = formatReceipts(transactions);
receiptList.forEach(r => console.log(`  ${r}`));

console.log('\n');

// ============================================================
// 5. DEMO: SPREAD UPDATE (No Mutation)
// ============================================================

console.log('✏️ DEMO: Update Transaction #1 (spread)');
const original = transactions[0];
console.log(`  Original: #${original.id} ${original.customer} — ${original.amount} ETB`);

const updatedList = updateTransaction(transactions, 1, { amount: 250.50 });
const updated = updatedList.find(t => t.id === 1);
console.log(`  Updated: #${updated.id} ${updated.customer} — ${updated.amount} ETB`);

console.log('  ✅ Original transaction unchanged:', transactions[0].amount);

// ============================================================
// 6. DEMO: ADD TRANSACTION (Spread)
// ============================================================

console.log('\n➕ DEMO: Add New Transaction (spread)');
const newTx = { id: 6, customer: 'Helen', amount: 450, type: 'credit' };
const newList = addTransaction(transactions, newTx);
console.log(`  Added: #${newTx.id} ${newTx.customer} — ${newTx.amount} ETB`);
console.log(`  New total: ${newList.length} transactions`);
console.log('  ✅ Original list unchanged:', transactions.length, 'transactions');

// ============================================================
// 7. DEMO: GET TRANSACTION COPY
// ============================================================

console.log('\n📋 DEMO: Get Transaction #2 (spread copy)');
const txCopy = getTransactionById(transactions, 2);
console.log(`  #${txCopy.id} ${txCopy.customer} — ${txCopy.amount} ETB (${txCopy.type})`);
console.log('  ✅ Is a copy:', txCopy !== transactions.find(t => t.id === 2));

console.log('\n✅ Report complete!');