import {Injectable} from "@angular/core";
import {EMPTY, Observable} from "rxjs";
import {AProvider} from "../../../../../../tools/src/lib/module/common/provider/a.provider";
import {IProvider} from "../../../../../../tools/src/lib/module/common/provider/i.provider";
import {catchError, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {ISettings, Settings} from "../model/model";

@Injectable()
export class SettingsProvider extends AProvider implements IProvider {
    private url = this.baseUrl + 'settings';



    get(id: number): Observable<ISettings | any> {
        console.log('==========================')
        return this.http.get(this.url + '/' + id, this.getOptions()).pipe(
            map(item => {
                    try {
                        const body = (item as any).body as ISettings;
                        return new Settings()._init(body);
                    } catch (err) {
                        return {};
                    }
                }
            ),
            catchError(err => {
                return this.handleError(err);
            })
        )
    }

    update(id: number, data: ISettings): Observable<ISettings | any> {
        return this.http.put(this.url + '/' + id, data, this.getOptions()).pipe(
            map(res => {
                const t = (res as any) as HttpResponse<any>;
                return this.extractData(t);
            }),
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
}
