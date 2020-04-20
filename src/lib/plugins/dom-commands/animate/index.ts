import { PluginRegistration } from '../../../plugin-types';
import { animatePlugin } from './animate-commands';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './animate-commands';

const plugins: PluginRegistration[] = [animatePlugin];

export default plugins;
