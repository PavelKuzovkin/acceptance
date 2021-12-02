import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../../../../tools/src/lib/module/common/model/user';
import {UserProvider} from '../../../../../../tools/src/lib/module/common/provider/user.provider';
import {AuthenticationService} from '../../../../../../tools/src/lib/module/common/service/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-layout-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    user: IUser|undefined;
    init = false;

    constructor(
        private userProvider: UserProvider,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.userProvider.getCurrent().subscribe(user => {
            this.user = user;
            this.init = true;
        });
    }
    signOut(): false {
        this.init = false;
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');

        return false;
    }

}
