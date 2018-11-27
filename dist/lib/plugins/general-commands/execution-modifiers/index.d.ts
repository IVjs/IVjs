import { PluginRegistration } from '../../../base-iv';
import { runAsync, AddRunAsync } from './execute-async';
import { runSync, AddRunSync } from './execute-sync';
import { stopExecution, AddStopExecution } from './execution-requests';
import { AddGoToNode } from './go-to-node';
import { AddWait } from './wait';
export declare const executionModifiersPlugin: PluginRegistration;
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
