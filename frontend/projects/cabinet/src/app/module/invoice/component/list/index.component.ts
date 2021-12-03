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

@Component({
    selector: 'app-invoice-list',
    templateUrl: './index.component.html'
})
export class IndexInvoiceComponent extends ListComponent implements OnInit {
    list: IInvoice[] = [];
    prefix = 'INVOICE.FIELD.';

    constructor(
        protected fb: FormBuilder,
        protected router: Router,
        protected route: ActivatedRoute,
        protected provider: InvoiceProvider,
        protected toasterService: ToastrService,
        protected progress: NgProgress,
        protected titleService: Title,
        protected translate: TranslateService,
        private breadcrumbs: BreadcrumbsService
    ) {
        super(fb, router, route, provider, toasterService, progress, titleService, translate);

        this.statelink.page = '/dashboard/invoice'

        // const pref = 'INVOICE.';
        // this.translate.get([
        //     pref + 'TITLE'
        // ]).subscribe(mess => {
        //     this.title = mess[pref + 'TITLE'];
        //
        //     this.breadcrumbs.setPath({
        //         title: this.title
        //     })
        // })

    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    refresh(): void {
        this.getList();
    }
}
