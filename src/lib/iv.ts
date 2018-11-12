import { BaseIV } from './base-iv';
import {
  buttonsPlugin,
  videoPlugin,
  audioPlugin,
} from './plugins/dom-commands';
import {
  variableManipulationPlugin,
  executionModifiersPlugin,
} from './plugins/general-commands';
import { logRegistration } from './command-engine/log-commands';
import { runJsPlugin } from './command-engine/unserializable-commands';

export const IV = BaseIV.extend(
  runJsPlugin,
  videoPlugin,
  audioPlugin,
  buttonsPlugin,
  logRegistration,
  variableManipulationPlugin,
  executionModifiersPlugin,
)

export type IV = BaseIV;
