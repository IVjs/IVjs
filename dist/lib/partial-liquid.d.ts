export declare class PartialLiquid {
    private variables;
    private LIQUID_ONE;
    private LIQUID_ALL;
    implementedFilters: {
        'random': any;
    };
    constructor(variables: IV.Variables);
    replace(str: string): any;
    private replaceAsString;
    private getParts;
    private sendRawVar;
    private filteredVariable;
    private doFilter;
    private randomFilter;
}
