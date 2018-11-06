import { BaseIV } from './base-iv';
import { deprecatedVideoPlayRegistration, playVideoRegistration } from './command-engine/dom-commands';
import { calculateRegistration } from './command-engine/general-commands';
import { jsRegistration } from './command-engine/unserializable-commands';

export const IV = BaseIV.extend(
  jsRegistration,
  calculateRegistration,
  playVideoRegistration,
  deprecatedVideoPlayRegistration,
)

export type IV = BaseIV;
