export const assignVariableFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'assignVariable': (cmd: ICommand.AssignVariable) => {
      input.variables[cmd.assignTo] = cmd.value;
      return Promise.resolve({});
    }
  }
}