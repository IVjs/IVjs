import { BaseIV } from './base-iv';
import {
  addButtonRegistration,
  bgAudioRegistration,
  deprecatedVideoPlayRegistration,
  playVideoRegistration,
  removeAllButtonsRegistration,
  removeButtonRegistration,
  setVolumeRegistration,
} from './command-engine/dom-commands';
import { clearVideoRegistration } from './command-engine/dom-commands/video/clear-video';
import { calculateRegistration } from './command-engine/general-commands';
import { logRegistration } from './command-engine/log-commands';
import { jsRegistration } from './command-engine/unserializable-commands';

export const IV = BaseIV.extend(
  jsRegistration,
  calculateRegistration,
  playVideoRegistration,
  deprecatedVideoPlayRegistration,
  clearVideoRegistration,
  bgAudioRegistration,
  setVolumeRegistration,
  addButtonRegistration,
  removeAllButtonsRegistration,
  removeButtonRegistration,
  logRegistration,
)

export type IV = BaseIV;
