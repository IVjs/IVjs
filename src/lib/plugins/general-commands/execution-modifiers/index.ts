import { PluginRegistration } from '../../../base-iv';
import { executeAsync, executeAsyncFactory } from './execute-async';
import { executeSync, executeSyncFactory } from './execute-sync';
import { stopExecution, stopExecutionFactory, pauseExecutionFactory } from './execution-requests';
import { goToNode, goToNodeFactory } from './go-to-node';
import { wait, waitFactory } from './wait';

export const executionModifiersPlugin: PluginRegistration = {
  apiExtensions: [{
    apiName: 'return',
    apiFn: stopExecution,
  }, {
    apiName: 'goSub',
    apiFn: executeSync,
  }, {
    apiName: 'execute',
    apiFn: executeAsync,
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
    return: typeof stopExecution;
    execute: typeof executeAsync;
    goSub: typeof executeSync;
    goToNode: typeof goToNode;
    wait: typeof wait;
  }
}
