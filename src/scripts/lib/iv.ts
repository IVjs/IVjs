import { BaseIV } from './base-iv';
import { calculateRegistration } from './command-engine/general-commands';
import { jsRegistration } from './command-engine/unserializable-commands';

export const IV = BaseIV.extend(
  jsRegistration,
  calculateRegistration,
)

export type IV = BaseIV;
