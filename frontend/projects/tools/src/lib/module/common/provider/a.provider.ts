import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ConfigService} from "../service/config.service";

@Injectable()
export abstract class AProvider{

    protected baseUrl: string|undefined;

    protected options: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe: 'response';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
      body?: any;
    } | undefined;
    protected headers;
    public isReady = false;

    constructor(
        protected http: HttpClient,
        protected authenticationService: AuthenticationService,
        private router: Router,
        private configService: ConfigService) {

        if (configService.config)
            this.baseUrl = configService.config.baseUrl;

        if (this.authenticationService.getToken()) {
            this.isReady = true;
            this.headers = new HttpHeaders({
                Authorization: 'Bearer ' + this.authenticationService.getToken()
            });
            this.options = {headers: this.headers, withCredentials: true, observe: 'response', responseType: 'json'};
        }
    }

    getOptions(): any {
        if (this.authenticationService.getToken()) {
            this.headers = new HttpHeaders({
                Authorization: 'Bearer ' + this.authenticationService.getToken()
            });
            this.options = {headers: this.headers, withCredentials: true, observe: 'response', responseType: 'json'};
            this.isReady = true;
        } else {
            this.options = {observe: 'response', responseType: 'json'};
            this.isReady = false;
        }

        return this.options;
    }

    protected handleError(error: HttpErrorResponse): any {
        if (error.status === 400) {
            return [{
                status: error.status,
                message: error.message,
                error: error.error
            }];
        } else if (error.status === 401) {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        } else if (error.status === 403) {
            // this.authenticationService.logout();
            this.router.navigate(['/error/403']);
        } else {
            return [{
                status: error.status,
                message: error.error ? error.error.message : '',
                error: error.error ? error.error.error : ''
            }];
        }
        return null;
    }

    protected extractData(res: HttpResponse<any>): any {
        try {
            let t;
            if (res.hasOwnProperty('body')) {
                t = res.body as any;
            } else {
                t = res;
            }
            if (t === null) {
                t = {};
            }
            t.status = 200;
            return t;
        } catch (err) {
            return [];
        }
    }

    protected getQueryString(page: number, queryParams: object): string {
        return '?page=' + (page - 1) + '&' + this.getPartQueryString(queryParams);
    }

    protected getPartQueryString(queryParams: object): string {
        return Object.keys(queryParams).reduce((a, k) => {
            // @ts-ignore
            a.push(k + '=' + encodeURIComponent(queryParams[k]));
            return a;
        }, []).join('&');
    }

    protected createFormData(object: any, form?: FormData, namespace?: string): FormData {
        const formData = form || new FormData();
        for (const property in object) {
            if (!object.hasOwnProperty(property)) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if (typeof object[property] === 'object' && !Array.isArray(object[property]) && !(object[property] instanceof File)) {
                this.createFormData(object[property], formData, formKey);
            } else if (Array.isArray(object[property])) {
                // formData.append(formKey, object[property][0]);
                for (const one of object[property]) {
                    formData.append(formKey, one);
                }
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }

    protected createCollectionFormData(object: any, form?: FormData): FormData {
        const formData = form || new FormData();

        for (const property in object) {
            if (!object.hasOwnProperty(property)) {
                continue;
            }

            if (object[property] instanceof File) {
                formData.append(property, object[property]);
            } else {
                formData.append(property, new Blob([JSON.stringify(object[property])], {type: 'application/json'}));
            }
        }

        return formData;
    }


    protected ajaxQuery(url: string): Observable<any> {
        return ajax({
            url,
            method: 'GET',
            responseType: 'blob',
            withCredentials: true,
            headers: {
                Authorization: 'Bearer ' + this.authenticationService.getToken(),
                'Content-Type': 'application/json',
                Accept: 'text/plain, */*',
                'Cache-Control': 'no-cache',
            }
        }).pipe(
            map(this.handleDownloadSuccess),
            catchError(err => {
                console.log(err);
                return this.handleError(err);
            })
        );
    }

    private handleDownloadSuccess(response: AjaxResponse): void {
        const downloadLink = document.createElement('a');

        const disposition = response.xhr.getResponseHeader('Content-Disposition');
        if (disposition) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                const filename = matches[1].replace(/['"]/g, '');
                downloadLink.setAttribute('download', decodeURI(filename));
            }
        }
        downloadLink.href = window.URL.createObjectURL(response.response);

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
