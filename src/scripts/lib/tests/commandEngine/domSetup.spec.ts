import { IV } from '../../iv';

describe('DOM Setup', () => {
  let iv;
  let baseEl

  describe('improperly set intitial DOM env', () => {
    test('it throws when a node is not present on the page', () => {
      expect(() => new IV()).toThrow();
    })
  })

  describe('proper intial DOM env', ()=> {
    beforeEach(() => {
      baseEl = document.createElement('div');
      baseEl.id = 'IV-view'
      document.body.appendChild(baseEl);
    })

    test('it does not throw on setup', () => {
      expect(() => new IV()).not.toThrow();
    })

  })
})
