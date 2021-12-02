export interface IPageable {
    sort: string
    offset: number
    pageNumber: number
    pageSize: number
    unpaged: boolean
    paged: boolean
}

export class Pageable implements IPageable {
    constructor(
        public sort: string = "",
        public offset: number = 0,
        public pageNumber: number = 1,
        public pageSize: number = 10,
        public unpaged: boolean = false,
        public paged: boolean = true
    ) {
    }
}
