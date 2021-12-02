import {Component, OnInit} from "@angular/core";
import {EditComponent} from "../../../../../../../tools/src/lib/module/common/component/action/edit.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgProgress} from "ngx-progressbar";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {BreadcrumbsService} from "../../../../../../../tools/src/lib/module/common/service/breadcrumbs.service";
import {TranslateService} from "@ngx-translate/core";
import {UserProvider} from "../../provider/user.provider";

@Component({
    selector: 'app-user-edit',
    templateUrl: '../new/new.component.html'
})
export class EditUserComponent extends EditComponent implements OnInit {
    prefix = 'USER';

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        protected provider: UserProvider,
        private service: UserService,
        private breadcrumbs: BreadcrumbsService,
        protected translate: TranslateService
    ) {
        super(route, router, progress, titleService, toasterService, fb, provider, translate);
        this.statelink.page = '/dashboard/user';
    }

    getMoreInfo(): void {

        this.finalInitAction();
    }
}
