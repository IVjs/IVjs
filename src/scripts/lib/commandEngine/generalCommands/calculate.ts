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
  const startingValue = variables[varName]
  variables[assignTo] = 
    getOperation(operation)(startingValue, value)
  return {};
}

const operations = {
  add: (val1, val2) => val1 + val2,
  subtract: (val1, val2) => val1 - val2,
  multiply: (val1, val2) => val1 * val2,
  divide: (val1, val2) => val1 / val2,
  divideThenRemainder: (val1, val2) => val1 % val2,
  divideThenRoundDown: (val1, val2) => Math.floor(val1 / val2),
  divideThenRoundUp: (val1, val2) => Math.ceil(val1 / val2),
  divideThenRound: (val1, val2) => Math.round(val1 / val2),
  round: (val1) => Math.round(val1),
  roundUp: (val1) => Math.ceil(val1),
  roundDown: (val1) => Math.floor(val1),
}

function getOperation(operator: string) {
  const theOperation = operations[operator];
  if (!theOperation) {
    throw new Error(`There is no "${operator}" operator in the calculate command`);
  }
  return theOperation;
}
