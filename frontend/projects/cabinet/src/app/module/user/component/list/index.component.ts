import {ListComponent} from "../../../../../../../tools/src/lib/module/common/component/action/list.component";
import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgProgress} from "ngx-progressbar";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbsService} from "../../../../../../../tools/src/lib/module/common/service/breadcrumbs.service";
import {UserProvider} from "../../provider/user.provider";

@Component({
    selector: 'app-user-list',
    templateUrl: './index.component.html'
})
export class IndexUserComponent extends ListComponent {

    prefix = 'USER.FIELD.'

    constructor(
        protected fb: FormBuilder,
        protected router: Router,
        protected route: ActivatedRoute,
        protected provider: UserProvider,
        protected toasterService: ToastrService,
        protected progress: NgProgress,
        protected titleService: Title,
        protected translate: TranslateService,
        private breadcrumbs: BreadcrumbsService
    ) {
        super(fb, router, route, provider, toasterService, progress, titleService, translate);

        this.statelink.page = '/dashboard/user'

        const pref = 'USER.';
        this.translate.get([
            pref + 'TITLE'
        ]).subscribe(mess => {
            this.title = mess[pref + 'TITLE'];

            this.breadcrumbs.setPath({
                title: this.title
            })
        })

    }

    getList() {
        this.list = [{
            id: "1",
            created_at: null,
            reg_ip: "8.8.8.8",
            ip_country: "USA",
            name: "Name",
            surname: "Surname",
            login: "qq@qq.qq",
            email: "ee@ee.ee",
            reference_id: "RefKey",
            reference: {id: "10", email: "ref@email.qq"},
            reseller: {id: "20", name: "reseller"},
            price_id: "",
            discount_type: "",
            vol_discount: "",
            phone: "+9(999) 888 77 66",
            company: "My Company",
            country: "RUS",
            timezone: "UTC+03",
            address: "Address",
            currency: "USD",
            tax_id: "",
            f_lock: false
        }]

        this.init = true;
    }
}
