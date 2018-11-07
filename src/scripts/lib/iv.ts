import { BaseIV } from './base-iv';
import {
  buttonsPlugin,
  videoPlugin,
  audioCommandsRegistration,
} from './plugins/dom-commands';
import {
  variableManipulationPlugin,
  executionModifiersPlugin,
} from './plugins/general-commands';
import { logRegistration } from './command-engine/log-commands';
import { jsRegistration } from './command-engine/unserializable-commands';

export const IV = BaseIV.extend(
  jsRegistration,
  videoPlugin,
  audioCommandsRegistration,
  buttonsPlugin,
  logRegistration,
  variableManipulationPlugin,
  executionModifiersPlugin,
)

export type IV = BaseIV;
