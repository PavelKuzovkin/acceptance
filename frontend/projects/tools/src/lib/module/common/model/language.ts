export interface ILanguage {
    id: number;
    name: string;
    code: string;
    redirectConditionCountryIp: string[];
    redirectConditionBrowserLanguage: string[];
    redirectConditionOperator: string;
    getCountryIpString(): string;
    getBrowserLanguageString(): string;
}
