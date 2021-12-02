export interface IQueryError {
    alias: string;
    message: string[];
}

export interface IQueryResult {
    status: number;
    id?: string;
    errors?: IQueryError[];
}

export class QueryResult implements IQueryResult {
    constructor(public status: number, public errors: IQueryError[]) {
    }
}
