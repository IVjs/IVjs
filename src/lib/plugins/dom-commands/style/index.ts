import { PluginRegistration } from '../../../plugin-types';
import { stylePlugin } from './style-commands';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './style-commands';

const plugins: PluginRegistration[] = [stylePlugin];

export default plugins;
