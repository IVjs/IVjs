import { toType, traverseObject } from 'happy-helpers';
import { qsaToArray } from '../../test-support/dom-commands';
export { qsaToArray }

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function wait(time?: number) {
  return new Promise(res => {
    setTimeout(res, time);
  })
}

function safeCloneObject<T extends object>(obj: T): T {
  const outgoing = {} as T;
  traverseObject(obj, (prop, value) => {
    if (toType(value) === 'array') {
      outgoing[prop] = nearClone(value);
    } else if (toType(value) === 'object') {
      outgoing[prop] = safeCloneObject(value);
    } else {
      outgoing[prop] = value;
    }
  }, false, false);
  return outgoing;
}

export function nearClone<T extends any>(obj: T): T {
  const type = toType(obj);

  if (type === 'object') {
    return safeCloneObject(obj);
  } else if (type === 'array') {
    return obj.map(x => nearClone(x))
  } else {
    return obj;
  }
}

export function directDescendants(element: HTMLElement, selector): HTMLElement[] | [null] {
  const oldClass = element.getAttribute('class');
  element.setAttribute('class', oldClass + " IV-searching");
  const qsa: NodeListOf<HTMLElement> = (element.parentNode as HTMLElement).querySelectorAll('.IV-searching > ' + selector);
  element.setAttribute('class', oldClass);
  return qsaToArray(qsa);
}
