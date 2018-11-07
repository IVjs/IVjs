// Liquid markup (https://shopify.github.io/liquid/) inspired
import { toType } from 'happy-helpers';
import { getRandomInt } from './utils';

export class PartialLiquid {
  private LIQUID_ONE = /\{\{(.*?)( ?\| ?(.*)?)?\}\}/
  private LIQUID_ALL = new RegExp(this.LIQUID_ONE, 'g');

  public implementedFilters = {
    'random': this.randomFilter.bind(this)
  }

  constructor(private variables: IV.Variables) { }

  public replace(str: string): any {
    const parts = this.getParts(str);
    if (!parts) { return str; }
    if (parts.whole === str) {
      return this.sendRawVar(str);
    } else {
      return this.replaceAsString(str);
    }
  }

  private replaceAsString(str): string {
    return str.replace(this.LIQUID_ALL, (substring: string) => {
      return this.filteredVariable(substring).toString();
    });
  }

  private getParts(str: string): {whole: string, varName: string, filter: string} | null {
    const matches = str.match(this.LIQUID_ONE);
    if (!matches) { return null; }
    const [whole, varName, pipePhrase, filter] = matches;
    return { whole, varName, filter };
  }

  private sendRawVar(str: string): any {
    let variable;
    str.replace(this.LIQUID_ALL, (substring) => {
      variable = this.filteredVariable(substring)
      return substring;
    });
    return variable;
  }

  private filteredVariable(substring: string): any {
    const { whole, varName, filter } = this.getParts(substring);
    if (filter) {
      return this.doFilter(varName, filter);
    } else {
      return this.variables[varName];
    }
  }

  private doFilter(varName: string, filter: string) {
    const method = this.implementedFilters[filter];
    if (!method) {
      throw new Error(`There is no filter called "${filter}"`)
    }
    return method(varName)
  }

  private randomFilter(varName: string): any {
    const values = this.variables[varName] as any[];
    if (toType(values) !== 'array') {
      throw new Error('You cannot use the random filter on a non-array');
    }

    const randomIndex = getRandomInt(0, values.length - 1);
    return values[randomIndex];
  }
}