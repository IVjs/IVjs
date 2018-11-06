import { BaseIV } from './base-iv';
import {
  buttonCommandsRegistration,
  deprecatedVideoPlayRegistration,
  playVideoRegistration,
  audioCommandsRegistration,
} from './command-engine/dom-commands';
import { clearVideoRegistration } from './command-engine/dom-commands/video/clear-video';
import {
  calculateRegistration,
  getRandomNumberRegistration,
  setVariableRegistration,
  waitRegistration,
  goToNodeRegistration,
  executionRequestsRegistration
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
)

export type IV = BaseIV;
