import {Observable} from "rxjs";

export interface IProvider {
    getList(page: number, queryParams: Object): Observable<any>;
    get(id: number): Observable<any>;
    create(client: any): Observable<any>;
    update(id: number, client: any): Observable<any>;
    delete(id: number): Observable<any>;
}
