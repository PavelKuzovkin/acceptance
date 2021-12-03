import {Component, OnInit} from "@angular/core";
import {EditComponent} from "../../../../../../../tools/src/lib/module/common/component/action/edit.component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgProgress} from "ngx-progressbar";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {BreadcrumbsService} from "../../../../../../../tools/src/lib/module/common/service/breadcrumbs.service";
import {TranslateService} from "@ngx-translate/core";
import {InvoiceProvider} from "../../provider/invoice.provider";
import {InvoiceService} from "../../service/invoice.service";
import {ISelect} from "../../../../../../../tools/src/lib/module/common/model/select";

@Component({
    selector: 'app-invoice-close',
    templateUrl: './close.component.html'
})
export class CloseInvoiceComponent extends EditComponent implements OnInit {
    prefix = 'INVOICE';
    stateList: ISelect[];

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        protected provider: InvoiceProvider,
        protected translate: TranslateService
    ) {
        super(route, router, progress, titleService, toasterService, fb, provider, translate);
        this.statelink.page = '/dashboard/invoice';

        this.stateList = [
            {id: 'ACCEPTED', name: 'Принято'},
            {id: 'PARTLY_ACCEPTED', name: 'Частично принято'},
            {id: 'REJECTED', name: 'Не принято'},
        ];

    }

    getMoreInfo(): void {
        this.model.state = 'ACCEPTED';
        super.getMoreInfo();
    }
}
