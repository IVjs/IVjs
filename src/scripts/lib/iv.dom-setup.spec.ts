import { IV } from './iv';

// The following two functions are not necessary, but stop typescript from yelling
// The global functions referenced are added
// during setup via the `setup-env.js` file
// in the `test-support` folder.
function addBaseEl() {
  (global as any).addBaseIvElement();
}
function removeBaseEl() {
  (global as any).removeBaseIvElement();
}

describe('DOM Setup', () => {

  describe('proper intial DOM env', ()=> {
    beforeEach(addBaseEl)

    test('it does not throw on setup', () => {
      expect(() => new IV()).not.toThrow();
    })
  })

  describe('improperly set intitial DOM env', () => {
    afterEach(addBaseEl)

    test('it throws when a node is not present on the page', () => {
      removeBaseEl()
      expect(() => new IV()).toThrow();
    })
  })

})
