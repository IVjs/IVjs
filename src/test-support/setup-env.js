// This file is called before each test suite
// from a node environment.
const id = 'IV-view';

function removeBaseIvElement() {
  const previousEl = document.getElementById(id);
  if (previousEl) { previousEl.remove(); }
}

function addBaseIvElement() {
  removeBaseIvElement();
  const baseEl = document.createElement('div');
  baseEl.id = id
  document.body.appendChild(baseEl);
}

// adding the functions to the global scope
// which allows them to be used in test files
global.addBaseIvElement = addBaseIvElement;
global.removeBaseIvElement = removeBaseIvElement;

beforeEach(() => {
  addBaseIvElement();
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
});

afterEach(() => {
  console.error.mockRestore()
})
