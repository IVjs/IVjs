interface IIvCommandEngine {
  registerTargetFunctions(tf: Runner.TargetFunctionObject): void;
  run(): void;
}

interface IIvCommandEngineConstructorInput {
  baseContainer: any;
  nodes: IvNode[];
  commandRunnerClass: {
    new(obj: Runner.ConstructorInput): Runner.Class
  }
}

interface ctor extends IIvCommandEngineConstructorInput {
  baseContainer: HTMLElement;
}

export function createDomEngine(input: ctor) {
  const {baseContainer, nodes, commandRunnerClass } = input; 
  return new IvDomCommandEngine(baseContainer, nodes, commandRunnerClass);
}

export class IvDomCommandEngine implements IIvCommandEngine {
  private targetFunctions: Runner.TargetFunctionObject = {};

  constructor(
    private baseContainer: ctor['baseContainer'],
    private nodes: ctor['nodes'],
    private commandRunnerClass: ctor['commandRunnerClass'],
  ) { }

  registerTargetFunctions(targetFunctions: Runner.TargetFunctionObject) {
    Object.assign(this.targetFunctions, targetFunctions);
  }

  public run() {
    const targetFunctions = this.targetFunctions;
    const commands = [];
    new this.commandRunnerClass({targetFunctions, commands});
  }
}