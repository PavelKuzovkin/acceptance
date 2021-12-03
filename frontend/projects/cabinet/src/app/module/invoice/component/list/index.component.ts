import {ListComponent} from "../../../../../../../tools/src/lib/module/common/component/action/list.component";
import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgProgress} from "ngx-progressbar";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbsService} from "../../../../../../../tools/src/lib/module/common/service/breadcrumbs.service";
import {InvoiceProvider} from "../../provider/invoice.provider";
import {IInvoice} from "../../model/invoice";
import {StateProvider} from "../../provider/state.provider";

@Component({
    selector: 'app-invoice-list',
    templateUrl: './index.component.html'
})
export class IndexInvoiceComponent extends ListComponent implements OnInit {
    list: IInvoice[] = [];
    prefix = 'INVOICE.FIELD.';
    currentErrors = 0;

    constructor(
        protected fb: FormBuilder,
        protected router: Router,
        protected route: ActivatedRoute,
        protected provider: InvoiceProvider,
        protected stateProvider: StateProvider,
        protected toasterService: ToastrService,
        protected progress: NgProgress,
        protected titleService: Title,
        protected translate: TranslateService,
        private breadcrumbs: BreadcrumbsService
    ) {
        super(fb, router, route, provider, toasterService, progress, titleService, translate);

        this.statelink.page = '/dashboard/invoice'
    }

    ngOnInit(): void {
        super.ngOnInit();
        setInterval(() => {
            this.getList(true);
            this.getCurrentState();
        }, 3000)

    }

    getCurrentState(): void {
        this.stateProvider.get().subscribe((i: any) => { this.currentErrors = i; });
    }

    refresh(): void {
        this.getList();
        this.getCurrentState();
    }
}
