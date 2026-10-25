const birrFormatter = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 0,
})

export function formatBirr(amount) {
  return birrFormatter.format(amount)
}
