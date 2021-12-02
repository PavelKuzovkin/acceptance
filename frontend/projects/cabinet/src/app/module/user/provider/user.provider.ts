import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AProvider} from "../../../../../../tools/src/lib/module/common/provider/a.provider";
import {IProvider} from "../../../../../../tools/src/lib/module/common/provider/i.provider";
import {catchError, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {IQueryResult} from "../../../../../../tools/src/lib/module/common/model/query.result";
import {IUser, IUserList, User} from "../model/user";

@Injectable()
export class UserProvider extends AProvider implements IProvider {
    private url = this.baseUrl + 'user';

    getList(page: number, queryParams: Object = {}): Observable<IUserList | any> {
        return this.http.get(this.url + '/' + this.getQueryString(page, queryParams), this.getOptions()).pipe(
            map((item: any) => {
                try {
                    const body = (item as any).body as IUserList;
                    const test = body.content.map(entity => {
                        return new User()._init(entity);
                    });
                    body.content = test;
                    body.status = 200;
                    return body || {};
                } catch (err) {
                    return {status: 500};
                }
            }),
            catchError((err: any) => {
                return this.handleError(err);
            })
        );
    }

    delete(id: number): Observable<IQueryResult | any> {
        return this.http.delete(this.url + '/' + id, this.getOptions()).pipe(
            map(res => {
                const t = (res as any) as HttpResponse<any>;
                return this.extractData(t);
            }),
            catchError(err => {
                return this.handleError(err);
            })
        )
    }

    create(data: IUser): Observable<IUser | any> {
        return this.http.post(this.url, data, this.getOptions()).pipe(
            map(res => {
                const t = (res as any) as HttpResponse<any>;
                return this.extractData(t);
            }),
            catchError(err => {
                return this.handleError(err);
            })
        )
    }

    get(id: number): Observable<IUser | any> {
        return this.http.get(this.url + '/' + id, this.getOptions()).pipe(
            map(item => {
                    try {
                        const body = (item as any).body as IUser;
                        return new User()._init(body);
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

    update(id: number, data: IUser): Observable<IUser | any> {
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
}
