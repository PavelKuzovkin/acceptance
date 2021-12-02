import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../../../tools/src/lib/module/common/service/authentication.service";
import {DOCUMENT} from "@angular/common";
import {UserProvider} from "../../../../../../tools/src/lib/module/common/provider/user.provider";

@Component({
    selector: 'app-auth-callback',
    template: ''
})
export class CallbackComponent  implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private userProvider: UserProvider,
        @Inject(DOCUMENT) private _document: Document,
    ) {
    }

    ngOnInit() {
        let query = '/';
        const token = localStorage.getItem('tokenIntegration');
        if (token)
            query = '/?token=' + token;

        this.route.queryParams.subscribe(list => {
            if (list.hasOwnProperty('t')) {

                this.authService.setToken({token: list.t, roles: ['USER']});

                this.userProvider.getCurrent().subscribe(user => {
                    this.authService.setToken({token: list.t, roles: [user.role]});

                    // @ts-ignore
                    this._document?.location = query;
                });
            }
        })
    }
}
