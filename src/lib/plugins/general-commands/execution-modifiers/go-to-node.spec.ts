import { create, createMockEngine } from '../../../../test-support';
import { goToNodeFactory } from './go-to-node';

describe('go-to-node-factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = goToNodeFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {},
    });

    expect(tfo).toHaveProperty('goToNode');
    expect(typeof tfo.goToNode).toEqual('function');
  });

  test('it calls run() on the desired node', () => {
    const mock = createMockEngine();
    const tfo = goToNodeFactory({
      settings: create('ivSettings'),
      commandEngine: mock,
      variables: {},
    });

    const command: ICommand.GoToNode = { name: 'goToNode', nodeName: 'bob' };
    tfo.goToNode(command);

    expect(mock.runNodeByName).toHaveBeenCalledWith('bob');
  });
});
