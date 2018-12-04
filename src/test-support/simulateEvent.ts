export function simulateEventOnElement(name: string, el: HTMLElement, evtData = {}) {
  const evt = document.createEvent('HTMLEvents');
  Object.assign(evt, evtData);
  evt.initEvent(name, false, true);
  el.dispatchEvent(evt);
}
