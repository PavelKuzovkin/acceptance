import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../../../tools/src/lib/module/common/service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserProvider} from "../../../../../../tools/src/lib/module/common/provider/user.provider";
import {IUser} from "../../../../../../tools/src/lib/module/common/model/user";
import * as moment from "moment-timezone";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-top-navbar',
    templateUrl: './_top.navbar.component.html',
})
export class TopNavbarComponent implements OnInit {
    user: IUser | undefined
    init = false
    time = moment()
    bsModalRef: BsModalRef | undefined


    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private userProvider: UserProvider,
        private modalService: BsModalService,
    ) {
    }

    ngOnInit() {
    }

    logout() {
    }

    timer() {
        setInterval(() => {
            const t = this.time.add(1, "second");
        }, 1000)
    }

}
