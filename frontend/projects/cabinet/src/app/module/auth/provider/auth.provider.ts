import {Injectable} from '@angular/core';
import {AProvider} from '../../../../../../tools/src/lib/module/common/provider/a.provider';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthProvider extends AProvider {
    private url = this.baseUrl + 'auth/';

    registration(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'user', data, this.getOptions()).pipe(
            map(item => {
                const res = item as any;
                if (res.status == 200) {
                    return {status: 200};
                } else {
                    return res.body;
                }
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    registrationConfirm(data: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            withCredentials: true,
            observe: 'response' as 'response'
        };
        return this.http.post(this.url + 'registration_confirm', data, httpOptions).pipe(
            map((item: any) => {
                const body = (item as any).body as any;
                if (body.token) {
                    this.authenticationService.setToken(body);

                    return {
                        status: 200
                    };
                } else {
                    return {
                        status: 403,
                        message: 'Forbidden',
                    };
                }
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    forgotPassword(data: any): Observable<any> {
        return this.http.post(this.url + 'forgot_password', data, this.getOptions()).pipe(
            map(item => {
                return {status: 200};
            }),
            catchError(err => {
                if (err.status === 200) {
                    return {status: 200};
                } else {
                    return this.handleError(err);
                }
            })
        );
    }

    userCheck(data: any): Observable<any> {
        return this.http.post(this.url + 'user_check', data, this.getOptions()).pipe(
            map(item => {
                const res = item as any;
                if (res.body) {
                    return res.body;
                } else {
                    return {status: 200};
                }
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    passwordReset(data: any): Observable<any> {
        return this.http.post(this.url + 'password_reset', data, this.getOptions()).pipe(
            map(item => {
                const res = item as any;
                if (res.body) {
                    return res.body;
                } else {
                    return {status: 200};
                }
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }
}

