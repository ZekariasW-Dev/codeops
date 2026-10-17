# TeleBirr Transaction Report

## Business
A transaction report generator for a TeleBirr shop in Addis Ababa, Ethiopia.

## How to Open
1. Open `index.html` in your browser (supports ES modules)
2. Or run with Live Server in VS Code
3. Open console (F12) to see full report output

## Modules

### transactions.js
- Exports the transaction data array
- Each transaction: `{ id, customer, amount, type }`
- Type is either "credit" or "debit"

### report.js
- `totalByType()` — filter + reduce to sum by type
- `formatReceipts()` — map with destructuring
- `getTransactionById()` — returns a spread copy
- `addTransaction()` — adds using spread
- `updateTransaction()` — updates using spread

### app.js
- Imports data and functions
- Generates HTML report in the browser
- Outputs full report to console
- Demos spread update without mutation

## JavaScript Features Used

| Feature | Where |
|---------|-------|
| `map` | formatReceipts() |
| `filter` | totalByType() |
| `reduce` | totalByType() |
| Destructuring | `({ amount })` in reduce |
| Spread | `{ ...t }`, `[...transactions]` |
| Template Literals | Receipt strings |
| ES Modules | export/import |

## Accessibility Features
- Semantic HTML
- Good color contrast
- Clear visual hierarchy
- Responsive design

## CSS Techniques Used
- CSS variables for colors
- Box model with border-radius
- Card-based layout
- Responsive design