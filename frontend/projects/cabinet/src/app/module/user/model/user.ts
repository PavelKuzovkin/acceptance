import * as moment from "moment";
import {Moment} from "moment";

export interface IUserList {
    content: IUser[]
    totalElements: number
    totalPages: number
    last: boolean
    size: number
    number: number
    first: boolean
    numberOfElements: number
    empty: boolean
    status: number
}

export interface IUser {
    id: number
    clientId: number | undefined
    login: string
    password: string
    securQuestion: string
    securPin: string
    createdAt: Moment | null
    isLocked: boolean
}

export class User implements IUser {
    constructor(
        public id: number = 0,
        public clientId: number | undefined = undefined,
        public login: string = '',
        public password: string = '',
        public securQuestion: string = '',
        public securPin: string = '',
        public createdAt: Moment | null = null,
        public isLocked: boolean = false
    ) {
    }

    _init(data: IUser | null): IUser {
        for (const key in data) {
            if (key === 'createdAt') {
                if (data[key]) {
                    this[key] = moment(data[key]);
                }
            } else {
                // @ts-ignore
                this[key] = data[key];
            }
        }

        return this;
    }
}
