import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {NgxPermissionsService} from 'ngx-permissions';
import {ConfigService} from "./config.service";

export interface AuthInfo {
    token: string;
    roles: string[];
}
@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    public token: string | null;

    constructor(
        private http: HttpClient,
        private permissionsService: NgxPermissionsService,
        private configService: ConfigService
    ) {
        const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (currentUser && currentUser.hasOwnProperty('roles')) {
            this.permissionsService.loadPermissions(currentUser.roles);
        }
    }

    // @ts-ignore
    login(form: any): Observable<any> {
        if (this.configService.config) {
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type': 'application/json'}),
                withCredentials: true,
                observe: 'response' as 'response'
            };

            return this.http.post(this.configService.config.baseUrl + 'auth/login', form, httpOptions).pipe(
                map((item: any) => {
                    try {
                        const body = (item as any).body as any;
                        if (body.token) {
                            this.setToken(body);

                            return {
                                status: 200
                            };
                        } else {
                            return {
                                status: 403,
                                message: 'Forbidden',
                            };
                        }
                    } catch (err) {
                        return {
                            status: 500,
                            message: 'Internal server error',
                        };
                    }
                }),
                catchError(err => {
                    return this.handleError(err);
                })
            );
        } else {
            setTimeout(() =>{
                this.login(form);
            }, 100);
        }
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getToken(): string|null {
        if (!this.token) {
            const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
            this.token = currentUser && currentUser.token;
        }
        return this.token;
    }

    setToken(response: AuthInfo): void {
        this.token = response.token;

        localStorage.setItem('currentUser', JSON.stringify({token: response.token, roles: response.roles}));
        this.permissionsService.loadPermissions(response.roles);
    }

    hasRole(role: string) {
        const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
        return currentUser.roles.indexOf(role) >= 0;
    }

    private handleError(error: HttpErrorResponse): any {
        return [{
            status: error.status,
            message: error.message,
            error: error.error
        }];
    }
}
