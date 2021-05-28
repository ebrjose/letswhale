export function dec2weihex(decNumber) {
  return '0x' + (decNumber * 10 ** 18).toString(16)
}
export function weihex2dec(hexNUmber) {
  return parseInt(hexNUmber, 16) / 10 ** 18
}
