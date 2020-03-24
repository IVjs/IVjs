import { PluginRegistration } from '../plugin-types';

import domCommandsPlugins from './dom-commands';
import generalCommmandsPlugins from './general-commands';
import loggingCommandsPlugins from './logging-commands';
import unserializablePlugins from './unserializable-plugins';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './dom-commands';
export * from './general-commands';
export * from './logging-commands';
export * from './unserializable-plugins';

const plugins: PluginRegistration[] = [
  ...domCommandsPlugins,
  ...generalCommmandsPlugins,
  ...loggingCommandsPlugins,
  ...unserializablePlugins,
];

export default plugins;
