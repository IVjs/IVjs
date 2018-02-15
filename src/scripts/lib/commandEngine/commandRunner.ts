import { EventEmitter } from 'eventemitter3';

export class CommandRunner implements Runner.Class {
  public status: Runner.Status;

  private events = new EventEmitter();
  private targets: Runner.TargetFunctionObject = {};
  private commands: Runner.Command[];

  private getFunctionFor(name: string) {
    if (!this.targets[name]) {
      throw new Error(`There is no registered function to execute the "${name}" command.`);
    }
    return this.targets[name];
  }

  private nextIndex = 0;

  constructor({commands, targetFunctions}: Runner.ConstructorInput) {
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

  once(event, listener) {
    return this.events.once(event, listener);
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
      return this.runCommand(cmd)
      .then(cmdReturn => this.evaluateReturn(cmdReturn))
      .then(() => this.runNextCommand());
    } else {
      this.setStatus('done');
    }
  }

  private async evaluateReturn(theReturn: Runner.CommandReturn) {
    const {commands, value, asyncCommands} = theReturn;
    if (asyncCommands) this.asyncSeries(asyncCommands);
    if (commands) {
      return this.runNewSeries(commands);
    } else {
      return {value};
    }
  }

  private asyncSeries(eventualCommands: Promise<Runner.Command[]>) {
    eventualCommands.then(commands => {
      this.runNewSeries(commands)
      .catch((err: Error) => {
        const beginningMessage = err.message.slice(0,10) + '...'
        console.error(`the error thrown above (beginning "${beginningMessage}") was in an async branch`);
      })
    })
  }

  private runNewSeries(commands: Runner.Command[]) {
    return new Promise(res => {
      const runner = new CommandRunner({
        targetFunctions: this.targets,
        commands
      });
      runner.once('done', res);
      runner.run();
    }).catch(err => {
      console.error('a child runner threw an error:')
      console.error(err)
      throw err;
    })
  }

  private runCommand(cmd: Runner.Command) {
    const targetFunction = this.getFunctionFor(cmd.name);
    return targetFunction(cmd);
  }
}