export class CommandRunner {
  private targets: Runner.TargetFunctionObject = {};
  private commands: Runner.Command[];
  private getFunctionFor(name: string) {
    return this.targets[name];
  }

  private nextIndex = 0;

  constructor({commands, targetFunctions}: {commands: Runner.Command[], targetFunctions: Runner.TargetFunctionObject}) {
    this.commands = commands;
    this.targets = targetFunctions
  }

  run() {
    this.runNextCommand();
  }

  private advanceIndex() {
    this.nextIndex++;
  }

  private runNextCommand() {
    const cmd = this.commands[this.nextIndex]
    if (cmd) {
      this.advanceIndex()
      return this.runCommand(cmd).then(() => this.runNextCommand());
    } else {
      // done.
    }
  }

  private runCommand(cmd: Runner.Command) {
    const targetFunction = this.getFunctionFor(cmd.name);
    return targetFunction(cmd);
  }
}