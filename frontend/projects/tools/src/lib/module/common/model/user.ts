import * as moment from "moment";
import {Moment} from "moment";

export interface IUser {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    phone: string;
    role: string;
    roleId: number[];
    timezone: string;
    serverTime: Moment|null;

    getFullName(): string;
    getShortName(): string;
}

export class User implements IUser {
    constructor(
        public id: number = 0,
        public lastName: string = '',
        public firstName: string = '',
        public middleName: string = '',
        public email: string = '',
        public phone: string = '',
        public role: string = '',
        public roleId: number[] = [],
        public timezone: string = '',
        public serverTime: Moment|null = null
    ) {
    }

    public _init(data: IUser): User {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                if (key === 'serverTime') {
                    this.serverTime = moment(data[key]).utc();
                } else {
                    // @ts-ignore
                    this[key] = data[key];
                }
            }
        }

        return this;
    }

    getFullName(): string {
        const str = [];
        if (this.lastName) {
            str.push(this.lastName);
        }
        if (this.firstName) {
            str.push(this.firstName);
        }
        if (this.middleName) {
            str.push(this.middleName);
        }
        return str.join(' ');
    }

    getShortName(): string {
        const str = [];
        if (this.lastName) {
            str.push(this.lastName);
        }
        if (this.firstName) {
            const i = this.firstName.substr(0, 1).toUpperCase() + '.';
            str.push(i);
        }
        if (this.middleName) {
            const i = this.middleName.substr(0, 1).toUpperCase() + '.';
            str.push(i);
        }
        return str.join(' ');
    }
}
