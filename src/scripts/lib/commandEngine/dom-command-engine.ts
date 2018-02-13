export interface IIvCommandEngine {
  registerTargetFunction(tf: TargetFunctionFactory): void;
  run(): void;
}

export interface ctor {
  baseContainer: any;
  nodes: IvNode[];
  variables: { [x: string]: any }
  commandRunnerClass: {
    new(obj: Runner.ConstructorInput): Runner.Class
  }
}

export interface TargetFunctionFactoryInput {
  baseContainer: ctor['baseContainer'];
  nodes: ctor['nodes'];
  variables: ctor['variables'];
}

export type TargetFunctionFactory = (input: TargetFunctionFactoryInput) => Runner.TargetFunctionObject;

export function createEngine(input: ctor, ...functionFactories) {
  const { baseContainer, nodes, commandRunnerClass, variables } = input; 
  const engine = new IvCommandEngine(baseContainer, nodes, commandRunnerClass, variables);

  functionFactories.forEach(factory => {
    engine.registerTargetFunction(factory);
  })

  return engine;
}

export class IvCommandEngine implements IIvCommandEngine {
  private targetFunctions: Runner.TargetFunctionObject = {};

  constructor(
    private baseContainer: ctor['baseContainer'],
    private nodes: ctor['nodes'],
    private commandRunnerClass: ctor['commandRunnerClass'],
    private variables: ctor['variables'],
  ) { }

  registerTargetFunction(factory: TargetFunctionFactory) {
    const { baseContainer, variables, nodes } = this;
    const input = { baseContainer, variables, nodes };
    Object.assign(this.targetFunctions, factory(input));
  }

  public run() {
    const targetFunctions = this.targetFunctions;
    const commands = [];
    new this.commandRunnerClass({targetFunctions, commands});
  }
}