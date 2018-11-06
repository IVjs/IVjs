import { PluginRegistration } from '../../base-iv';
import { IvNode } from '../../node';

interface BaseAssignVariable {
  storeIn: string;
}

interface AssignVariableWithVar extends BaseAssignVariable {
  var: string;
}

interface AssignVariableWithValue extends BaseAssignVariable  {
  value: string | number | Array<string | number>;
}

type AssignVariableOptions =  BaseAssignVariable & Partial<AssignVariableWithVar & AssignVariableWithValue>;

export const assignFromVariableFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'assignFromVariable': (cmd: ICommand.AssignFromVariable) => {
      input.variables[cmd.assignTo] = input.variables[cmd.varName];
      return Promise.resolve({});
    }
  }
}

export const assignVariableFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'assignVariable': (cmd: ICommand.AssignVariable) => {
      input.variables[cmd.assignTo] = cmd.value;
      return Promise.resolve({});
    }
  }
}

function setVariable(this: IvNode, objSettings: AssignVariableOptions) : IvNode {
  if (objSettings.var)
  {
    const command: ICommand.AssignFromVariable = { name:'assignFromVariable', varName : objSettings.var,  assignTo: objSettings.storeIn };
    this.pushCommands(command);
  }
  else
  {
    if(objSettings.value)
    {
      const command: ICommand.AssignVariable = { name:'assignVariable', value: objSettings.value , assignTo: objSettings.storeIn };
      this.pushCommands(command);
    }

  }
  return this as any as IvNode;
}

export const setVariableRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'setVariable',
    apiFn: setVariable,
  }],
  targetFunctionFactories: [
    assignVariableFactory,
    assignFromVariableFactory,
  ],
}

declare module '../../node' {
  interface NodeExtensions {
    setVariable: typeof setVariable;
  }
}