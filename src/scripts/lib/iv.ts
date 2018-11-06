import { BaseIV } from './base-iv';
import { deprecatedVideoPlayRegistration, playVideoRegistration } from './command-engine/dom-commands';
import { clearVideoRegistration } from './command-engine/dom-commands/video/clear-video';
import { calculateRegistration } from './command-engine/general-commands';
import { jsRegistration } from './command-engine/unserializable-commands';

export const IV = BaseIV.extend(
  jsRegistration,
  calculateRegistration,
  playVideoRegistration,
  deprecatedVideoPlayRegistration,
  clearVideoRegistration,
)

export type IV = BaseIV;
