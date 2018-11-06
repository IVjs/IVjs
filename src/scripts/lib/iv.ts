import { BaseIV } from './base-iv';
import {
  buttonsPlugin,
  videoPlugin,
  audioCommandsRegistration,
} from './plugins/dom-commands';
import {
  calculateRegistration,
  getRandomNumberRegistration,
  setVariableRegistration,
  waitRegistration,
  goToNodeRegistration,
  executionRequestsRegistration,
  executeAsyncRegistration,
  executeSyncRegistration
} from './command-engine/general-commands';
import { logRegistration } from './command-engine/log-commands';
import { jsRegistration } from './command-engine/unserializable-commands';

export const IV = BaseIV.extend(
  jsRegistration,
  calculateRegistration,
  videoPlugin,
  audioCommandsRegistration,
  buttonsPlugin,
  logRegistration,
  getRandomNumberRegistration,
  setVariableRegistration,
  waitRegistration,
  goToNodeRegistration,
  executionRequestsRegistration,
  executeAsyncRegistration,
  executeSyncRegistration,
)

export type IV = BaseIV;
