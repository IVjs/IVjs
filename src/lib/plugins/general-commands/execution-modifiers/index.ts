import { PluginRegistration } from '../../../base-iv';
import { runAsync, executeAsyncFactory, AddRunAsync } from './execute-async';
import { runSync, executeSyncFactory, AddRunSync } from './execute-sync';
import { stopExecution, stopExecutionFactory, pauseExecutionFactory, AddStopExecution } from './execution-requests';
import { goToNode, goToNodeFactory, AddGoToNode } from './go-to-node';
import { wait, waitFactory, AddWait } from './wait';

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
  interface NodeExtensions extends AddStopExecution, AddRunAsync, AddRunSync, AddGoToNode, AddWait {
  }
}
