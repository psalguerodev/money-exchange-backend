export function calculateAmountExchange(change: number, amount: number, precision: number): string {
const factor = Math.pow(10, precision);
const tempNumber = (change * amount) * factor;
const roundedTempNumber = Math.round(tempNumber);
return `${(roundedTempNumber / factor)}`;
}
