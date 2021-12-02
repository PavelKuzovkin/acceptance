import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AProvider} from "../../../../../../tools/src/lib/module/common/provider/a.provider";
import {IProvider} from "../../../../../../tools/src/lib/module/common/provider/i.provider";
import {catchError, map} from "rxjs/operators";
import {ICountry} from "../model/country";
import {ITimezone} from "../model/timezone";
import {ICurrency} from "../model/currency";
import {ILanguage} from "../model/language";
import {ISelect} from "../model/select";

@Injectable()
export class CommonProvider extends AProvider implements IProvider {
    private url = this.baseUrl;

    getCountryList(): Observable<ISelect[] | any> {
        return this.http.get(this.url + 'country/select', this.getOptions()).pipe(
            map(res => {
                try {
                    const body = (res as any).body as ISelect[];
                    return {list: body, status: 200}
                } catch (err) {
                    return {status: 500};
                }
            }),
            catchError((err: any) => {
                return this.handleError(err);
            })
        );
    }

    getTimezoneList(): Observable<ITimezone[] | any> {
        return this.http.get(this.url + 'timezone', this.getOptions()).pipe(
            map(res => {
                try {
                    const body = (res as any).body as ITimezone[];
                    return { list: body, status: 200 }
                } catch (err) {
                    return {status: 500};
                }
            }),
            catchError((err: any) => {
                return this.handleError(err);
            })
        );
    }

    getLanguageList(): Observable<ILanguage[] | any> {
        return this.http.get(this.url + 'language', this.getOptions()).pipe(
            map(res => {
                try {
                    const body = (res as any).body as ILanguage[];
                    return { list: body, status: 200 }
                } catch (err) {
                    return {status: 500};
                }
            }),
            catchError((err: any) => {
                return this.handleError(err);
            })
        );
    }

    getCurrencyList(): Observable<ICurrency[] | any> {
        return this.http.get(this.url + 'currency', this.getOptions()).pipe(
            map(res => {
                try {
                    const body = (res as any).body as ICountry[];
                    return { list: body, status: 200 }
                } catch (err) {
                    return {status: 500};
                }
            }),
            catchError((err: any) => {
                return this.handleError(err);
            })
        );
    }

    create(client: any): Observable<any>  { return new Observable<any>() }
    delete(id: number): Observable<any>  { return new Observable<any>() }
    get(id: number): Observable<any>  { return new Observable<any>() }
    getList(page: number, queryParams: Object): Observable<any>   { return new Observable<any>() }
    update(id: number, client: any): Observable<any>   { return new Observable<any>() }

}
