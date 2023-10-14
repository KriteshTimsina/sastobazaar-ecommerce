/**
 * This function is to convert USD to NPR using the current dollar rate
 *
 * @param {number} amount - A number/string.
 * @returns {number}
 */
export function getLocalPrice(amount, dollarRate=100) {
    return amount*dollarRate;
}
