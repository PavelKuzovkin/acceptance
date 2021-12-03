import {Injectable} from "@angular/core";
import {EMPTY, Observable} from "rxjs";
import {AProvider} from "../../../../../../tools/src/lib/module/common/provider/a.provider";
import {IProvider} from "../../../../../../tools/src/lib/module/common/provider/i.provider";
import {catchError, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {IQueryResult} from "../../../../../../tools/src/lib/module/common/model/query.result";
import {IInvoice, IInvoiceList, Invoice} from "../model/invoice";

@Injectable()
export class StateProvider extends AProvider implements IProvider {
    private url = this.baseUrl + 'state';


    get(): Observable<number | any> {
        return this.http.get(this.url, this.getOptions()).pipe(
            map(item => {
                    try {
                        return <number>(<any>item).body;
                    } catch (err) {
                        return 0;
                    }
                }
            ),
            catchError(err => {
                return this.handleError(err);
            })
        )
    }

    create(client: any): Observable<any> {
        return EMPTY;
    }

    delete(id: number): Observable<any> {
        return EMPTY;
    }

    getList(page: number, queryParams: Object): Observable<any> {
        return EMPTY;
    }

    update(id: number, client: any): Observable<any> {
        return EMPTY;
    }

}
