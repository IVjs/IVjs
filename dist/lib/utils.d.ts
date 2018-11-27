import { qsaToArray } from '../test-support/dom-commands';
export { qsaToArray };
export declare function getRandomInt(min: number, max: number): number;
export declare function wait(time?: number): Promise<{}>;
export declare function nearClone<T extends any>(obj: T): T;
export declare function directDescendants(element: HTMLElement, selector: any): HTMLElement[] | [null];
export declare function urlsMatch(url1: string, url2: string): boolean;
export declare function sanitizeUrl(url: string): string;
