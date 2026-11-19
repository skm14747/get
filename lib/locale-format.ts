export function formatLocaleDecimal(value: number, numberLocale: string): string {
  return new Intl.NumberFormat(numberLocale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}
