import { IvNode } from '../../../node';

interface CalculateBase {
  var: string;
  storeIn: string;
}

interface CalculateAdd extends CalculateBase {
  add: number;
}

interface CalculateSubtract extends CalculateBase {
  subtract: number;
}

interface CalculateMultiply extends CalculateBase {
  multiply: number;
}

interface CalculateDivide extends CalculateBase {
  divide: number;
}

type CalculateOptions = Partial<
  CalculateAdd
  & CalculateSubtract
  & CalculateMultiply
  & CalculateDivide
  >


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
  remainderAfterDivideBy: (val1, val2) => val1 % val2,
  roundDownAfterDivideBy: (val1, val2) => Math.floor(val1 / val2),
  roundUpAfterDivideBy: (val1, val2) => Math.ceil(val1 / val2),
  roundAfterDivideBy: (val1, val2) => Math.round(val1 / val2),
  round: (val1) => Math.round(val1),
  roundUp: (val1) => Math.ceil(val1),
  roundDown: (val1) => Math.floor(val1),
}

function getOperation(operator: string) {
  const theOperation = operations[operator];
  if (!theOperation) {
    throw new Error(`There is no "${operator}" operation in the calculate command`);
  }
  return theOperation;
}

export function calculate(this: IvNode, optionsObj: CalculateOptions): void {
  let op: string = '';
  let val: number = 0;
  const assignTo = optionsObj.storeIn ? optionsObj.storeIn : optionsObj.var;
  if (optionsObj.add) {
    op = 'add';
    val = optionsObj.add;
  }
  else if (optionsObj.subtract) {
    op = 'subtract';
    val = optionsObj.subtract;
  }
  else if (optionsObj.multiply) {
    op = 'multiply';
    val = optionsObj.multiply;
  }
  else if (optionsObj.divide) {
    op = 'divide';
    val = optionsObj.divide;
  }
  else {
    const passedProps = Object.keys(optionsObj);
    const keyValueStrings = passedProps.map(propName => {
      let value = optionsObj[propName];
      value = typeof value === 'string' ? `"${value}"` : value;
      return `${propName}: ${value}`;
    });
    const availableOperations = Object.keys(operations);
    const availableOperationsList = availableOperations
      .map(opName => `"${opName}"`).join(', ')
      .replace(/, ([^,]*)$/, ', or $1');
    const unknownProps = passedProps
      .filter(passed => ['var', 'storeIn'].concat(availableOperations).indexOf(passed) === -1);
    const unknownPropsList = unknownProps
      .map(prop => `"${prop}"`).join(', ')
      .replace(/, ([^,]*)$/, ', and $1');

    const message = `Object with unknown ${unknownProps.length > 1 ? 'properties' : 'property'} ${unknownPropsList} passed into Calculate().\n\nWas expecting an object with properties "var", and then one of ${availableOperationsList}. Optionally also "storeIn" If you don't want to overwrite the current variable.\n\nReceived {${keyValueStrings.join(', ')}}`
    throw new Error(message)
  }

  const command: ICommand.Calculate = {
    name: 'calculate',
    varName: optionsObj.var,
    operation: op as ICommand.Calculate['operation'],
    value: val,
    assignTo,
  };
  this.pushCommands(command);
}
