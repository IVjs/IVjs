export { qsaToArray } from '../../test-support/dom-commands'

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function wait(time?: number) {
  return new Promise(res => {
    setTimeout(res, time);
  })
}
