import {Injectable} from "@angular/core";
import {AProvider} from "./a.provider";
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class IntegrationProvider extends AProvider {
    private url = this.baseUrl + 'integration/';

    confirm(token: string, confirm: string): Observable<any> {
        return this.http.get(this.url + 'confirm?token=' + token + '&confirm=' + confirm, this.getOptions()).pipe(
            map((item: any) => {
                try {
                    return {redirect_uri: item.body} || {};
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
