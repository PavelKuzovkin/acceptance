import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private permissionsService: NgxPermissionsService
    ) {
    }

    canActivate(): boolean {
        const info = localStorage.getItem('currentUser');
        if (typeof info === 'string' && info) {
            const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
            if (currentUser.hasOwnProperty('roles')) {
                this.permissionsService.loadPermissions(currentUser.roles);
            }

            return true;
        }

        this.router.navigate(['/login'], {queryParamsHandling: 'preserve'});
        return false;
    }
}
