import { PluginRegistration } from '../../plugin-types';

import { variableManipulationPlugin } from './variable-modification';
import { executionModifiersPlugin } from './execution-modifiers';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './variable-modification';
export * from './variable-modification/get-random-number';
export * from './execution-modifiers';
export * from './execution-modifiers/wait';

const plugins: PluginRegistration[] = [variableManipulationPlugin, executionModifiersPlugin];

export default plugins;
