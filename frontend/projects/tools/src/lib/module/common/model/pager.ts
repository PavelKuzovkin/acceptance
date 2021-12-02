export interface IPager {
    currentPage: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    maxPerPage: number;
    nbPages: number;
    nbResult: number;
    start: number;
}

export class Pager implements IPager {
    constructor(
        public currentPage: number = 1,
        public end: number = 1,
        public hasNextPage: boolean = false,
        public hasPreviousPage: boolean = false,
        public maxPerPage: number = 10,
        public nbPages: number = 1,
        public nbResult: number = 0,
        public start: number = 1
    ) {}
}
