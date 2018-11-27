import { PluginRegistration } from '../../base-iv';
import { logPlugin } from './log';

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './log';

const plugins: PluginRegistration[] = [logPlugin];

export default plugins;
