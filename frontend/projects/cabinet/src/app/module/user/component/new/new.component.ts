import {Component} from "@angular/core";
import {NewComponent} from "../../../../../../../tools/src/lib/module/common/component/action/new.component";
import {Router} from "@angular/router";
import {NgProgress} from "ngx-progressbar";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {BreadcrumbsService} from "../../../../../../../tools/src/lib/module/common/service/breadcrumbs.service";
import {TranslateService} from "@ngx-translate/core";
import {UserProvider} from "../../provider/user.provider";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
    selector: 'app-user-new',
    templateUrl: './new.component.html'
})
export class NewUserComponent extends NewComponent {
    prefix = 'USER'

    constructor(
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        protected provider: UserProvider,
        private service: UserService,
        private breadcrumbs: BreadcrumbsService,
        protected translate: TranslateService,
    ) {
        super(router, progress, titleService, toasterService, fb, provider, translate);
        this.model = new User();
        this.statelink.page = '/dashboard/user';

        this.service.init(this.model);
    }

    createForm(): void {
        this.form = this.service.createForm();
    }

    getMoreInfo(): void {

        this.finalInitAction();
    }

}
