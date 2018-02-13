import { CommandRunner } from './commandRunner';

export function createEngine(input: CommandEngine.ctor, ...functionFactories) {
  const { baseContainer, nodes, commandRunnerClass, variables } = input; 
  const engine = new IvCommandEngine(baseContainer, nodes, commandRunnerClass, variables);

  functionFactories.forEach(factory => {
    engine.registerTargetFunction(factory);
  })

  return engine;
}

export class IvCommandEngine implements CommandEngine.Class {
  private targetFunctions: Runner.TargetFunctionObject = {};
  private runners: {[x: string]: Runner.Class} = {};

  constructor(
    private baseContainer: CommandEngine.ctor['baseContainer'],
    private nodes: CommandEngine.ctor['nodes'],
    private commandRunnerClass: CommandEngine.ctor['commandRunnerClass'],
    private variables: CommandEngine.ctor['variables'],
  ) { }

  registerTargetFunction(factory: CommandEngine.TargetFunctionFactory) {
    const { baseContainer, variables, nodes } = this;
    const input = { baseContainer, variables, nodes };
    Object.assign(this.targetFunctions, factory(input));
  }

  public run() {
    this.createRunners();
    this.runFirstNode();
  }

  private createRunners() {
    const targetFunctions = this.targetFunctions;
    this.nodes.forEach(node => {
      const commands = node.getCommands();
      this.runners[node.name] = new this.commandRunnerClass({
        targetFunctions,
        commands
      })
    })
  }

  private runFirstNode() {
    if (this.nodes[0]) {
      this.getRunnerForNode(this.nodes[0].name).run();
    }
  }

  private getRunnerForNode(name: string) {
    return this.runners[name];
  }
}