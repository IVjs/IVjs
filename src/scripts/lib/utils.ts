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
  const outgoing = {};
  traverseObject(obj, (prop, value) => {
    if (toType(value) === 'array') {
      outgoing[prop] = nearClone(value);
    } else if (toType(value) === 'object') {
      outgoing[prop] = safeCloneObject(value);
    } else {
      outgoing[prop] = value;
    }
  }, false, false);
  return outgoing as T;
}

export function nearClone<T extends any>(obj: T): T {
  const type = toType(obj);

  if (isObject(obj)) {
    return safeCloneObject(obj);
  } else if (type === 'array') {
    return obj.map(x => nearClone(x))
  } else {
    return obj;
  }
}

function isObject(obj: any): obj is object {
  return toType(obj) === 'object';
}

export function directDescendants(element: HTMLElement, selector): HTMLElement[] | [null] {
  const oldClass = element.getAttribute('class');
  element.setAttribute('class', oldClass + " IV-searching");
  const qsa: NodeListOf<HTMLElement> = (element.parentNode as HTMLElement).querySelectorAll('.IV-searching > ' + selector);
  element.setAttribute('class', oldClass);
  return qsaToArray(qsa);
}

export function urlsMatch(url1: string, url2: string): boolean {
  console.log('sanitizing', sanitizeUrl(url1), sanitizeUrl(url2));
  return sanitizeUrl(url1) === sanitizeUrl(url2);
}

export function sanitizeUrl(url: string): string {
  if (url.substr(0, 2) === '//') {
    return `${document.location.protocol}${url}`;
  }
  if (url[0] === '/') {
    return `${document.location.origin}${url}`;
  }
  if (url.indexOf('/') === -1) {
    return `${document.location.origin}/${url}`;    
  }
  return url;
}