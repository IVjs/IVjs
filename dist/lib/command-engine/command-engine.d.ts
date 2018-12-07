export declare class IvCommandEngine implements CommandEngine.Class {
  private settings;
  private nodes;
  private commandRunnerClass;
  private variables;
  private targetFunctions;
  private runners;
  constructor(
    settings: CommandEngine.ctor['settings'],
    nodes: CommandEngine.ctor['nodes'],
    commandRunnerClass: CommandEngine.ctor['commandRunnerClass'],
    variables: CommandEngine.ctor['variables'],
  );
  registerTargetFunction(factory: CommandEngine.CommandHandlerInitializer): void;
  run(name?: string): void;
  runCommands(commands: ICommand.AnyCommand[]): Promise<Runner.Class>;
  private createRunners;
  private createCommandRunner;
  private runFirstNode;
  runNodeByName(name: string): Promise<Runner.Class>;
  private getRunnerForNode;
}
