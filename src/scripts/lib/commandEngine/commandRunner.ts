import { EventEmitter } from 'eventemitter3';

export class CommandRunner {
  public status: Runner.Status;

  private events = new EventEmitter();
  private targets: Runner.TargetFunctionObject = {};
  private commands: Runner.Command[];
  private getFunctionFor(name: string) {
    return this.targets[name];
  }

  private nextIndex = 0;

  constructor({commands, targetFunctions}: {commands: Runner.Command[], targetFunctions: Runner.TargetFunctionObject}) {
    this.commands = commands;
    this.targets = targetFunctions;
    this.setStatus('ready');
  }

  run() {
    this.runNextCommand();
  }

  on(event, listener) {
    return this.events.on(event, listener);
  }

  private setStatus(status: Runner.Status) {
    this.events.emit(status);
    this.status = status;
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
      this.setStatus('done');
    }
  }

  private runCommand(cmd: Runner.Command) {
    const targetFunction = this.getFunctionFor(cmd.name);
    return targetFunction(cmd);
  }
}