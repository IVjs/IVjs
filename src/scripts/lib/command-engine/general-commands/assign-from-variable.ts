export const assignFromVariableFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'assignFromVariable': (cmd: ICommand.AssignFromVariable) => {
      input.variables[cmd.assignTo] = input.variables[cmd.varName];
      return Promise.resolve({});
    }
  }
}