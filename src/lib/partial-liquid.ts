// Liquid markup (https://shopify.github.io/liquid/) inspired
import { toType } from 'happy-helpers';
import { getRandomInt } from './utils';

export class PartialLiquid {
  private LIQUID_ONE = /\{\{(.*?)( ?\| ?(.*)?)?\}\}/;
  private LIQUID_ALL = new RegExp(this.LIQUID_ONE, 'g');

  public implementedFilters = {
    random: this.randomFilter.bind(this),
    upper: this.upperCaseFilter.bind(this),
    lower: this.lowerCaseFilter.bind(this),
    title: this.titleCaseFilter.bind(this),
    firstCap: this.titleCaseFirstFilter.bind(this),
  };

  constructor(private variables: IV.Variables) {}

  public replace(str: string): any {
    const parts = this.getParts(str);
    if (!parts) {
      return str;
    }
    if (parts.whole === str) {
      return this.sendRawVar(str);
    } else {
      return this.replaceAsString(str);
    }
  }

  private replaceAsString(str): any {
    return str.replace(this.LIQUID_ALL, (substring: string) => {
      const filtered = this.filteredVariable(substring);
      // if (Array.isArray(filtered)) {
      //   return filtered[0] + '||' + filtered[1] + '||';
      // }
      // else{
      return this.filteredVariable(substring).toString();
      //  }
    });
  }

  private getParts(str: string): { whole: string; varName: string; filter: string } | null {
    const matches = str.match(this.LIQUID_ONE);
    if (!matches) {
      return null;
    }
    const [whole, varName, pipePhrase, filter] = matches;
    return { whole, varName, filter };
  }

  private sendRawVar(str: string): any {
    let variable;
    str.replace(this.LIQUID_ALL, substring => {
      variable = this.filteredVariable(substring);
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
      throw new Error(`There is no filter called "${filter}"`);
    }
    return method(varName);
  }

  private randomFilter(varName: string): any {
    const values = this.variables[varName] as any[];
    if (toType(values) !== 'array') {
      throw new Error('You cannot use the random filter on a non-array');
    }

    const randomIndex = getRandomInt(0, values.length - 1);
    return values[randomIndex];
  }

  private upperCaseFilter(varName: string): any {
    return this.variables[varName].toUpperCase();
  }

  private lowerCaseFilter(varName: string): any {
    return this.variables[varName].toLowerCase();
  }

  private titleCaseFilter(varName: string): any {
    let str = this.variables[varName];
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  private titleCaseFirstFilter(varName: string): any {
    let str = this.variables[varName];
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
