import { IvNode } from '../../../node';

interface BaseAssignVariable {
  storeIn: string;
}

interface AssignVariableWithVar extends BaseAssignVariable {
  var: string;
}

interface AssignVariableWithValue extends BaseAssignVariable {
  value: string | number | Array<string | number>;
}

type SetVarInstructions = BaseAssignVariable & Partial<AssignVariableWithVar & AssignVariableWithValue>;

export const assignFromVariableFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.TargetFunctionObject => {
  return {
    assignFromVariable: (cmd: ICommand.AssignFromVariable) => {
      input.variables[cmd.assignTo] = input.variables[cmd.varName];
      return Promise.resolve({});
    },
  };
};

export const assignVariableFactory: CommandEngine.CommandHandlerInitializer = (input): Runner.TargetFunctionObject => {
  return {
    assignVariable: (cmd: ICommand.AssignVariable) => {
      input.variables[cmd.assignTo] = cmd.value;
      return Promise.resolve({});
    },
  };
};

export interface AddSetVariable {
  setVariable(instructions: SetVarInstructions);
}

export const setVariable: AddSetVariable['setVariable'] = function(
  this: IvNode,
  objSettings: SetVarInstructions,
): IvNode {
  if (objSettings.var) {
    const command: ICommand.AssignFromVariable = {
      name: 'assignFromVariable',
      varName: objSettings.var,
      assignTo: objSettings.storeIn,
    };
    this.pushCommands(command);
  } else {
    if (objSettings.value) {
      const command: ICommand.AssignVariable = {
        name: 'assignVariable',
        value: objSettings.value,
        assignTo: objSettings.storeIn,
      };
      this.pushCommands(command);
    }
  }
  return (this as any) as IvNode;
};
