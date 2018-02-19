// Liquid markup (https://shopify.github.io/liquid/) inspired

export class PartialLiquid {

  constructor(private variables: IV.Variables) { }

  public replace(str: string): string {
    return this.replaceAsString(str);
  }

  private replaceAsString(str) {
    const HANDLEBARS = /\{\{(.*?)( ?\| (.*)?)?\}\}/g
    return str.replace(HANDLEBARS, (substring: string, varName: string, pipePhrase, pipeFilter: string) => {
      return this.variables[varName].toString();
    });
  }

}