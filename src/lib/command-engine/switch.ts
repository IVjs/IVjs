export const switchFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    switch: (cmd: ICommand.Switch) => Promise.resolve(doSwitch(input, cmd)),
  };
};

export function doSwitch(given: CommandEngine.TargetFunctionFactoryInput, cmd: ICommand.Switch): Runner.CommandReturn {
  const { variables } = given;
  let winningCommands;
  cmd.do.forEach(condition => {
    if (winningCommands) {
      return;
    }
    winningCommands = winningCommandsOrNull(condition, variables);
  });
  const commands = winningCommands || cmd.defaultCommands;
  return { commands };
}

function winningCommandsOrNull(
  condition: SwitchDo.Any,
  variables: CommandEngine.TargetFunctionFactoryInput['variables'],
): SwitchDo.Base['commands'] | null {
  const operator = determineOperator(condition);
  const variable = variables[condition.varName];
  const operand = condition[operator];
  if (checkCondition(operator, variable, operand)) {
    return condition.commands;
  }
  return null;
}

function lowest(arr: number[]) {
  return Math.min(...arr);
}

function highest(arr: number[]) {
  return Math.max(...arr);
}

const operatorFunctions = {
  is: (variable, operand) => variable === operand,
  isGreaterThan: (variable, operand) => variable > operand,
  isLessThan: (variable, operand) => variable < operand,
  isGreaterThanOrEqualTo: (variable, operand) => variable >= operand,
  isLessThanOrEqualTo: (variable, operand) => variable <= operand,
  isBetween: (variable, arr) => lowest(arr) <= variable && variable <= highest(arr),
};

function determineOperator(singleDo: SwitchDo.Any): string {
  for (const prop in singleDo) {
    if (operatorFunctions.hasOwnProperty(prop)) {
      return prop;
    }
  }

  const unusedProps = [];
  for (const unusedProp in singleDo) {
    if (singleDo.hasOwnProperty(unusedProp)) {
      unusedProps.push(unusedProp);
    }
  }
  throw new Error(`could not find a valid operator in switch.do. Given these possibilities: ${unusedProps.join(', ')}`);
}

function checkCondition(operator, variable, operand): boolean {
  const opFunc = operatorFunctions[operator];
  return opFunc(variable, operand);
}
