export function simulateEventOnElement(name: string, el: HTMLElement) {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent(name, false, true);
  el.dispatchEvent(evt);
}