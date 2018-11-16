import { PluginRegistration } from '../../base-iv';
import {runJsPlugin} from './execute-js/execute-js'

// Ensure that the export chain reaches up to our
// IvNode module merges.
export * from './execute-js/execute-js'

const plugins: PluginRegistration[] = [
  runJsPlugin
];

export default plugins;