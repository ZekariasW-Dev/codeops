# Capstone kickoff: Pharmacy Stock Book

## Brief

Small pharmacies often track incoming stock, current quantities, and expiry dates in a paper book. Finding low-stock or soon-to-expire medicines takes time, especially during a busy shift. This capstone is a simple stock-book frontend for one pharmacy worker: the pharmacist responsible for daily inventory.

The app will use one source of data: a structured pharmacy inventory register containing medicine name, category, quantity, reorder threshold, expiry date, supplier, and unit price. For the initial capstone slice, this will be a local JSON data set; persistence or a live API can be considered later.

## Screens and data

| Screen | User need | Data needed |
| --- | --- | --- |
| Dashboard (`/`) | See the state of the shop at a glance | Total medicines, low-stock count, expiring-soon count, recent updates |
| Stock list (`/stock`) | Search and filter the register | Medicine name, category, quantity, threshold, expiry |
| Medicine detail (`/stock/:medicineId`) | Inspect one record and its supplier | One medicine record and supplier details |
| Suppliers (`/suppliers`) | Find a supplier for replenishment | Supplier name, contact, supplied medicines |
| Reports (`/reports`) | Plan restocking and reduce waste | Low-stock and soon-to-expire inventory |

## Route map

| Path | Renders | Dynamic | Guarded |
| --- | --- | --- | --- |
| `/` | Shared layout and dashboard placeholder | No | No |
| `/stock` | Shared layout and stock-list placeholder | No | No |
| `/stock/:medicineId` | Shared layout and medicine-detail placeholder | Yes: `medicineId` | No |
| `/suppliers` | Shared layout and suppliers placeholder | No | No |
| `/reports` | Shared layout and reports placeholder | No | No |
| `*` | Shared layout and not-found page | No | No |

## Scaffold and run

This scaffold uses Vite, React, and React Router. Each route is intentionally empty but reachable.

```bash
npm install
npm run dev
```

Build verification:

```bash
npm run build
```
