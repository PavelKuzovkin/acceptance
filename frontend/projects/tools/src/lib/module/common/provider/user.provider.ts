import {Injectable} from '@angular/core';
import {AProvider} from './a.provider';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {IUser, User} from '../model/user';

@Injectable()
export class UserProvider extends AProvider{
    private url = this.baseUrl + 'user/';

    getCurrent(): Observable<IUser|any> {
        return this.http.get(this.url + 'current', this.getOptions()).pipe(
            map(item => {
                try {
                    const res = item as any;
                    const body = res.body as IUser;
                    return new User()._init(body);
                } catch (err) {
                    return {};
                }
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }
}
