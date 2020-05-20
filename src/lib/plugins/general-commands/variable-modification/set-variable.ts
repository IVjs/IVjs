import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';

interface BaseAssignVariable {
  storeIn: string;
}

interface AssignVariableWithVar extends BaseAssignVariable {
  var: string;
}

interface AssignVariableWithValue extends BaseAssignVariable {
  value: string | number | Array<string | number>;
  concat?: boolean;
  val1?: string;
  val2?: string;
  val3?: string;
  val4?: string;
  val5?: string;
}

type SetVarInstructions = BaseAssignVariable & Partial<AssignVariableWithVar & AssignVariableWithValue>;

export const assignFromVariableFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    assignFromVariable: (cmd: ICommand.AssignFromVariable) => {
      input.variables[cmd.assignTo] = input.variables[cmd.varName];
      return Promise.resolve({});
    },
  };
};

export const assignVariableFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    assignVariable: (cmd: ICommand.AssignVariable) => {
      if (!cmd.concat) {
        input.variables[cmd.assignTo] = cmd.value;
        return Promise.resolve({});
      } else {
        input.variables[cmd.assignTo] = cmd.val1.toString() + cmd.val2 + cmd.val3 + cmd.val4 + cmd.val5;
        console.log(input.variables[cmd.assignTo]);
        return Promise.resolve({});
      }
    },
  };
};

export interface AddSetVariable {
  setVariable(instructions: SetVarInstructions);
}

export const setVariable: AddSetVariable['setVariable'] = function(
  this: CommandBuilderContext,
  objSettings: SetVarInstructions,
) {
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
        concat: objSettings.concat,
        val1: objSettings.value[0],
        val2: !objSettings.value[1] ? '' : objSettings.value[1],
        val3: !objSettings.value[2] ? '' : objSettings.value[2],
        val4: !objSettings.value[3] ? '' : objSettings.value[3],
        val5: !objSettings.value[4] ? '' : objSettings.value[4],
      };
      this.pushCommands(command);
    }
  }
};
