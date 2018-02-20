export const switchFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'switch':
      (cmd: ICommand.Switch) =>
        Promise.resolve(doSwitch(input, cmd))
  }
}

export function doSwitch(
  given: CommandEngine.TargetFunctionFactoryInput,
  cmd: ICommand.Switch
): Runner.CommandReturn {
  const { variables } = given;
  let winningCommand;
  cmd.do.forEach(condition => {
    const givenVar = variables[condition.varName];
    if (givenVar === condition.is) {
      winningCommand = condition.commands;
    }
  })
  return {commands: winningCommand};
}