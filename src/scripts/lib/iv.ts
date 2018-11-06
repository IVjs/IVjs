import { BaseIV } from './base-iv';
import {
  buttonCommandsRegistration,
  deprecatedVideoPlayRegistration,
  playVideoRegistration,
  audioCommandsRegistration,
} from './plugins/dom-commands';
import { clearVideoRegistration } from './plugins/dom-commands/video/clear-video';
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
  playVideoRegistration,
  deprecatedVideoPlayRegistration,
  clearVideoRegistration,
  audioCommandsRegistration,
  buttonCommandsRegistration,
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
