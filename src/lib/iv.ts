import { BaseIV } from './base-iv';
import allPlugins from './plugins';
export const IV = BaseIV.extend(...allPlugins)

export type IV = BaseIV;

// The next line helps ensure that our IvNode module merges are
// visible in typings without the user needing to import each
// one individually. So, it is really more like an export.
import './plugins'; // tslint:disable-line no-duplicate-imports
