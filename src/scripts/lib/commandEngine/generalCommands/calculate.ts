export const calculateFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  return {
    'calculate':
      (cmd: ICommand.Calculate) =>
        Promise.resolve(doCalculate(input, cmd))
  }
}

export function doCalculate(
  given: CommandEngine.TargetFunctionFactoryInput,
  cmd: ICommand.Calculate
): Runner.CommandReturn {
  const { variables } = given;
  const { operation, varName, value, assignTo } = cmd;
  variables[assignTo] = 
    getOperation(operation)(variables[varName], value)
  return {};
}

const operations = {
  add: (val1, val2) => val1 + val2,
  subtract: (val1, val2) => val1 - val2,
}

function getOperation(operator: string) {
  const theOperation = operations[operator];
  if (!theOperation) {
    throw new Error(`There is no "${operator}" operator in the calculate command`);
  }
  return theOperation;
}
