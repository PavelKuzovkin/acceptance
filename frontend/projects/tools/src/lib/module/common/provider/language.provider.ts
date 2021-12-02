import {Injectable} from "@angular/core";
import {AProvider} from "./a.provider";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ILanguage} from "../model/language";

@Injectable()
export class BaseLanguageProvider extends AProvider {
    private url = this.baseUrl + 'language/';

    getAll(): Observable<ILanguage[]|any> {
        return this.http.get(this.url + 'all', this.getOptions()).pipe(
            map((item: any) => {
                try {
                    const body = (item as any).body as ILanguage[];
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

    getDataCountry(lang: string) {
        return this.http.get('/assets/langs/' + lang + '.json', this.getOptions()).pipe(
            map((item: any) => {
                try {
                    return item.body || {};
                } catch (err) {
                    return {status: 500};
                }
            }),
            catchError((err: any) => {
                return this.handleError(err);
            })
        )
    }
}
