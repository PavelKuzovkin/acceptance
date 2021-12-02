import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

interface BreadcrumbPath {
    title: string;
    link: string;
}

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbsService {

    isShow = new BehaviorSubject(true);
    title = new BehaviorSubject('');
    helper = new BehaviorSubject('');
    path =  new BehaviorSubject([]);
    isShowPath = new BehaviorSubject(true);
    isShowHelper = new BehaviorSubject(false);

    setPath(opt: any): void {
        if (opt !== null) {
            this.isShow.next(opt.show || true);
            this.title.next(opt.title);
            if (opt.hasOwnProperty('helper')) {
                this.helper.next(opt.helper);
            }
            this.path.next([]);
            if (opt.hasOwnProperty('path')) {
                this.path.next(opt.path);
            }
            this.isShowPath.next(opt.showPath !== false);
            this.isShowHelper.next(!!opt.showHelper)
        } else {
            this.isShow.next(false);
        }
    }

    getTitle(): Observable<string> {
        return this.title.asObservable();
    }
    getHelper(): Observable<string> {
        return this.helper.asObservable();
    }
    getPath(): Observable<BreadcrumbPath[]> {
        return this.path;
    }
    show(): Observable<boolean> {
        return this.isShow;
    }
    showPath(): Observable<boolean> {
        return this.isShowPath;
    }
    showHelper(): Observable<boolean> {
        return this.isShowHelper;
    }
 }
