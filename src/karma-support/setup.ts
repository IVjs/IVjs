const xid = 'IV-view';

function xremoveBaseIvElement() {
  const previousEl = document.getElementById(xid);
  if (previousEl) {
    previousEl.remove();
  }
}

function xaddBaseIvElement() {
  xremoveBaseIvElement();
  const baseEl = document.createElement('div');
  baseEl.id = xid;
  document.body.appendChild(baseEl);
}

beforeEach(() => xaddBaseIvElement());
