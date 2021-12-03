export interface ISettings {
    stopOnIncident: boolean;
    cleanPercent: number;
    partialPercent: number;
    badPercent: number;
    quantityAlarm: number;
}

export class Settings implements ISettings {
    constructor(
        public stopOnIncident: boolean = false,
        public cleanPercent: number = 0,
        public partialPercent: number = 0,
        public badPercent: number = 0,
        public quantityAlarm: number = 0
    ) {
    }

    _init(data: ISettings | null): ISettings {
        for (const key in data) {
            // @ts-ignore
            this[key] = data[key];
        }

        return this;
    }
}
