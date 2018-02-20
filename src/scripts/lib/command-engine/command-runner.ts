import { EventEmitter } from 'eventemitter3';
import { traverseObject } from 'happy-helpers';
import { PartialLiquid } from '../../lib/partial-liquid'

export class CommandRunner implements Runner.Class {
  public status: Runner.Status;

  private events = new EventEmitter();
  private targets: Runner.ConstructorInput['targetFunctions'] = {};
  private commands: Runner.ConstructorInput['commands'];
  private variables: Runner.ConstructorInput['variables']
  private shouldContinue = true;
  private replacer: PartialLiquid;

  private getFunctionFor(name: string) {
    if (!this.targets[name]) {
      throw new Error(`There is no registered function to execute the "${name}" command.`);
    }
    return this.targets[name];
  }

  private nextIndex = 0;

  constructor({commands, targetFunctions, variables}: Runner.ConstructorInput) {
    this.commands = commands;
    this.targets = targetFunctions;
    this.variables = variables;
    this.replacer = new PartialLiquid(this.variables);
    this.setStatus('ready');
  }

  run() {
    this.runNextCommand();
    return this;
  }

  on(event, listener) {
    return this.events.on(event, listener);
  }

  once(event, listener) {
    return this.events.once(event, listener);
  }

  private setStatus(status: Runner.Status) {
    if (status === 'done') {
      this.resetState();
    }
    this.events.emit(status);
    this.status = status;
  }

  private resetState() {
    this.nextIndex = 0;
    this.shouldContinue = true;
  }

  private advanceIndex() {
    this.nextIndex++;
  }

  private runNextCommand() {
    const cmd = this.commands[this.nextIndex]
    if (cmd && this.shouldContinue) {
      this.advanceIndex()
      this.runCommand(cmd)
        .then(cmdReturn => this.evaluateReturn(cmdReturn))
        .then(() => this.runNextCommand());
    } else {
      this.setStatus('done');
    }
  }

  private async evaluateReturn(theReturn: Runner.CommandReturn) {
    const {commands, requests, asyncCommands} = theReturn;
    if (asyncCommands) this.asyncSeries(asyncCommands);
    
    const shouldContinue = this.evaluateRequests(requests);

    if (!shouldContinue) return;

    if (commands) {
      return this.runNewSeries(commands);
    }
  }

  private evaluateRequests(requests: Runner.CommandReturn['requests']): boolean {
    if (! requests) return true;
    if (requests.some(r => r === 'exit')) {
      this.shouldContinue = false;
      return false;
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
        commands,
        variables: this.variables
      });
      runner.once('done', res);
      runner.run();
    }).catch(err => {
      console.error('a child runner threw an error:')
      console.error(err)
      throw err;
    })
  }

  private runCommand(incomingCommand: Runner.Command) {
    const cmd = this.replaceVariables(incomingCommand);
    const targetFunction = this.getFunctionFor(cmd.name);
    return targetFunction(cmd);
  }

  private replaceVariables(incoming: Runner.Command): Runner.Command {
    const outgoing = traverseObject(incoming, (prop, value) => {
      if (typeof value === 'string') {
        value = this.replaceVariableInString(value);
      }
      return [prop, value];
    }, true) as Runner.Command;
    return outgoing;
  }

  private replaceVariableInString(str: string): string {
    return this.replacer.replace(str);
  }
}