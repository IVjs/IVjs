import { PluginRegistration } from '../../../base-iv';
import { runAsync, executeAsyncFactory } from './execute-async';
import { runSync, executeSyncFactory } from './execute-sync';
import { stopExecution, stopExecutionFactory, pauseExecutionFactory } from './execution-requests';
import { goToNode, goToNodeFactory } from './go-to-node';
import { wait, waitFactory } from './wait';

const deprecate = (oldName: string, newName:string, fn: (...args: any[]) => any) => function (...args: any[]) {
  console.warn(`The ${oldName} command has been deprecated. Please use ${newName} instead. If you like the old name better, consider aliasing the function. See IVjs documentaion regarding plugins for an explanation.`);
  return fn.apply(this, args);
};

export const executionModifiersPlugin: PluginRegistration = {
  apiExtensions: [{
    apiName: 'return',
    apiFn: deprecate('return', 'endAllNodes', stopExecution),
  }, {
    apiName: 'goSub',
    apiFn: deprecate('goSub', 'runSync', runSync),
  }, {
    apiName: 'execute',
    apiFn: deprecate('execute', 'runAsync', runAsync),
  }, {
    apiName: 'endAllNodes',
    apiFn: stopExecution,
  }, {
    apiName: 'runSync',
    apiFn: runSync,
  }, {
    apiName: 'runAsync',
    apiFn: runAsync,
  }, {
    apiName: 'goToNode',
    apiFn: goToNode,
  }, {
    apiName: 'wait',
    apiFn: wait,
  }],
  targetFunctionFactories: [
    stopExecutionFactory,
    pauseExecutionFactory,
    executeAsyncFactory,
    executeSyncFactory,
    goToNodeFactory,
    waitFactory,
  ],
}

declare module '../../../node' {
  interface NodeExtensions {
    endAllNodes: typeof stopExecution;
    runAsync: typeof runAsync;
    runSync: typeof runSync;
    goToNode: typeof goToNode;
    wait: typeof wait;
  }
}
