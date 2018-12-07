import { PluginRegistration } from '../../../base-iv';
import { runAsync, executeAsyncFactory, AddRunAsync } from './execute-async';
import { runSync, executeSyncFactory, AddRunSync } from './execute-sync';
import { stopExecution, stopExecutionFactory, pauseExecutionFactory, AddStopExecution } from './execution-requests';
import { goToNode, goToNodeFactory, AddGoToNode } from './go-to-node';
import { wait, waitFactory, AddWait } from './wait';

const deprecate = (oldName: string, newName: string, fn: (...args: any[]) => any) =>
  function(...args: any[]) {
    console.warn(
      `The ${oldName} command has been deprecated. Please use ${newName} instead. If you like the old name better, consider aliasing the function. See IVjs documentaion regarding plugins for an explanation.`,
    );
    return fn.apply(this, args);
  };

export const executionModifiersPlugin: PluginRegistration = {
  nodeExtension: {
    return: deprecate('return', 'endAllNodes', stopExecution),
    goSub: deprecate('goSub', 'runSync', runSync),
    execute: deprecate('execute', 'runAsync', runAsync),
    endAllNodes: stopExecution,
    runSync,
    runAsync,
    goToNode,
    wait,
  },
  targetFunctionFactories: [
    stopExecutionFactory,
    pauseExecutionFactory,
    executeAsyncFactory,
    executeSyncFactory,
    goToNodeFactory,
    waitFactory,
  ],
};

declare module '../../../node' {
  interface NodeExtensions extends AddStopExecution, AddRunAsync, AddRunSync, AddGoToNode, AddWait {
    /**
     * Deprecated in favor of `endAllNodes()`
     */
    return: typeof stopExecution;
    /**
     * Deprecated in favor of `runSync()`
     */
    goSub: typeof runSync;
    /**
     * Deprecated in favor of `runAsync()`
     */
    execute: typeof runAsync;
  }
}
