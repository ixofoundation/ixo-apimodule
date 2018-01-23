export function generateTxnId(): number {
    return Math.floor((Math.random() * 100000) + 1);
}