import { IvNode } from '../../../node';

interface CalculateBase {
  var: string;
  storeIn?: string;
}


type CalculateOptions = CalculateBase & Partial<{
  add: number;
  subtract: number;
  multiply: number;
  divide: number;
}>;


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

function testUserInput(optionsObj: CalculateOptions) {
  const availableOperations = Object.keys(operations);
    const passedProps = Object.keys(optionsObj);
  const unknownProps = passedProps
    .filter(passed => ['var', 'storeIn'].concat(availableOperations).indexOf(passed) === -1);

  if (unknownProps.length > 0) {
    const keyValueStrings = passedProps.map(propName => {
      let theValue = optionsObj[propName];
      theValue = typeof theValue === 'string' ? `"${theValue}"` : theValue;
      return `${propName}: ${theValue}`;
    });
    const availableOperationsList = availableOperations
      .map(opName => `"${opName}"`).join(', ')
      .replace(/, ([^,]*)$/, ', or $1');
    const unknownPropsList = unknownProps
      .map(prop => `"${prop}"`).join(', ')
      .replace(/, ([^,]*)$/, ', and $1');
    const message = `Object with unknown ${unknownProps.length > 1 ? 'properties' : 'property'} ${unknownPropsList} passed into Calculate().\n\nWas expecting an object with properties "var", and then one of ${availableOperationsList}. Optionally also "storeIn" If you don't want to overwrite the current variable.\n\nReceived {${keyValueStrings.join(', ')}}`
    throw new Error(message)
  }

}

export function calculate(this: IvNode, optionsObj: CalculateOptions): void {
  testUserInput(optionsObj);
  const availableOperations = Object.keys(operations);
  const operation = Object.keys(optionsObj).filter(key => availableOperations.indexOf(key) > -1)[0] as ICommand.Calculate['operation'];
  const value = optionsObj[operation];

  const assignTo = optionsObj.storeIn ? optionsObj.storeIn : optionsObj.var;
  
  const command: ICommand.Calculate = {
    name: 'calculate',
    varName: optionsObj.var,
    operation,
    value,
    assignTo,
  };
  this.pushCommands(command);
}
