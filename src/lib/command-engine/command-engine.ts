export class IvCommandEngine implements CommandEngine.Class {
  private targetFunctions: Runner.CommandHandlerRegistrationObject = {};
  private runners: { [x: string]: Runner.Class } = {};

  constructor(
    private settings: CommandEngine.ctor['settings'],
    private nodes: CommandEngine.ctor['nodes'],
    private commandRunnerClass: CommandEngine.ctor['commandRunnerClass'],
    private variables: CommandEngine.ctor['variables'],
  ) {}

  public registerTargetFunction(factory: CommandEngine.CommandHandlerInitializer) {
    const input = { settings: this.settings, variables: this.variables, commandEngine: this };
    Object.assign(this.targetFunctions, factory(input));
  }

  public run(name?: string) {
    this.createRunners();
    if (name) {
      this.runNodeByName(name);
    } else {
      this.runFirstNode();
    }
  }

  public runCommands(commands: ICommand.AnyCommand[]) {
    return this.createCommandRunner(commands).run();
  }

  private createRunners() {
    const targetFunctions = this.targetFunctions;
    this.nodes.forEach(node => {
      const commands = node.getCommands();
      this.runners[node.name] = this.createCommandRunner(commands);
    });
  }

  private createCommandRunner(commands: ICommand.AnyCommand[]): Runner.Class {
    return new this.commandRunnerClass({
      variables: this.variables,
      targetFunctions: this.targetFunctions,
      commands,
    });
  }

  private runFirstNode() {
    if (this.nodes[0]) {
      this.getRunnerForNode(this.nodes[0].name).run();
    }
  }

  public runNodeByName(name: string): Promise<Runner.Class> {
    return this.getRunnerForNode(name).run();
  }

  private getRunnerForNode(name: string) {
    return this.runners[name];
  }
}
