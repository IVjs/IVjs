import { IvCommandEngine } from './command-engine';
import { Omit } from '../../types';
export declare function createEngine(
  engineConstructorInput: CommandEngine.ctor,
  ...functionFactories: any[]
): IvCommandEngine;
export declare function createBaseEngine(
  engineConstructorInput: Omit<CommandEngine.ctor, 'commandRunnerClass'>,
  ...functionFactories: any[]
): IvCommandEngine;
