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