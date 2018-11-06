import { IvNode } from '../../node';

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

export const calculateRegistration = {
  apiName: 'calculate',
  apiFn: calculate,
  targetFunctionFactory: calculateFactory,
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

function calculate(this: IvNode, optionsObj: CalculateOptions): void {
  let op: string = '';
  let val: number = 0;
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
    const received = [];
    for (const prop in optionsObj) {
      if (optionsObj.hasOwnProperty(prop)) {
        received.push(`"${prop}"`);
      }
    }
    const message = `Unknown options passed into Calculate(). Was expecting "var", "storeIn" and then one of "add", "subtract", "multiply", or "delete". Received [${received.join(', ')}]`
    throw new Error(message)
  }

  const command: ICommand.Calculate = {
    name: 'calculate',
    varName: optionsObj.var,
    operation: op as ICommand.Calculate['operation'],
    value: val,
    assignTo: optionsObj.storeIn
  };
  this.pushCommands(command);
}

declare module '../../node' {
  interface NodeExtensions {
    calculate: (options: CalculateOptions) => void
  }
}
