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
import { logPlugin } from './plugins/logging-commands';
import { runJsPlugin } from './plugins/unserializable-plugins/execute-js';

export const IV = BaseIV.extend(
  runJsPlugin,
  videoPlugin,
  audioPlugin,
  buttonsPlugin,
  logPlugin,
  variableManipulationPlugin,
  executionModifiersPlugin,
)

export type IV = BaseIV;
