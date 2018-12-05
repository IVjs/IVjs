export function simulateEventOnElement(name: string, el: HTMLElement, evtData = {}) {
  if (el == null) {
    throw new Error('Simulate event received no element');
  }
  const evt = document.createEvent('HTMLEvents');
  Object.assign(evt, evtData);
  evt.initEvent(name, false, true);
  el.dispatchEvent(evt);
}
