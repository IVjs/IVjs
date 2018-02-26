import { EventEmitter } from 'eventemitter3';
import { traverseObject, toType } from 'happy-helpers';
import { PartialLiquid } from '../../lib/partial-liquid'

export class CommandRunner implements Runner.Class {
  public status: Runner.Status;

  private events = new EventEmitter();
  private targets: Runner.ConstructorInput['targetFunctions'] = {};
  private commands: Runner.ConstructorInput['commands'];
  private variables: Runner.ConstructorInput['variables']
  private replacer: PartialLiquid;
  private runQueue: Array<() => void> = [];

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

  run(): Promise<this> {
    if (this.canRun()) {
      return this.doRun();
    } else {
      return this.enqueueRun();
    }
  }

  on(event, listener) {
    return this.events.on(event, listener);
  }

  once(event, listener) {
    return this.events.once(event, listener);
  }

  private doRun(): Promise<this> {
    this.setStatus('running');
    this.runNextCommand();
    return Promise.resolve(this);
  }

  private enqueueRun(): Promise<this> {
    let doRun: () => void;
    const willRun: Promise<this> = new Promise(resolve => {
      doRun = () => {
        resolve(this.doRun())
      }
    })
    this.runQueue.push(doRun)
    return willRun;
  }

  private canRun(): boolean {
    return this.status !== 'running' && this.status !== 'waiting'
  }

  private setStatus(status: Runner.Status) {
    this.events.emit(status);
    this.status = status;
  }

  private resetIndex() {
    this.nextIndex = 0;
  }

  private advanceIndex() {
    this.nextIndex++;
  }

  private runNextCommand() {
    if (this.status !== 'running') return;

    const cmd = this.commands[this.nextIndex]
    if (cmd) {
      this.advanceIndex()
      this.runCommand(cmd)
        .then(cmdReturn => this.evaluateReturn(cmdReturn))
        .then(() => this.runNextCommand())
    } else {
      this.exit();
    }
  }

  private async evaluateReturn(theReturn: Runner.CommandReturn) {
    const {commands, requests, asyncCommands} = theReturn;
    if (asyncCommands) this.asyncSeries(asyncCommands);
    if (commands) await this.runNewSeries(commands);
    await this.evaluateRequests(requests);
  }

  private async evaluateRequests(requests: Runner.CommandReturn['requests']) {
    if (!requests) return;
    if (requests.some(r => r === 'exit')) return this.exit();
    if (requests.some(r => r === 'pause')) return this.pause();
    return;
  }

  private exit() {
    this.resetIndex();
    const runImmediately = this.runQueue.shift();
    if (runImmediately) return runImmediately();
    this.setStatus('done');
  }

  private pause() {
    this.setStatus('paused');
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

    const traverse = (obj) => {
      const outgoing = {}
      traverseObject(obj, (prop, value) => {
        if (toType(value) === 'string') {
          outgoing[prop] = this.replaceVariableInString(value);
        } else if (toType(value) === 'object' ) {
          outgoing[prop] = traverse(value);
        } else {
          outgoing[prop] = value;
        }
      }, false, false);
      return outgoing;
    }

    return traverse(incoming) as Runner.Command;
  }


  private replaceVariableInString(str: string): string {
    return this.replacer.replace(str);
  }
}
