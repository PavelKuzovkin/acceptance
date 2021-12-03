import {Component} from "@angular/core";
import {NewComponent} from "../../../../../../../tools/src/lib/module/common/component/action/new.component";
import {Router} from "@angular/router";
import {NgProgress} from "ngx-progressbar";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Invoice} from "../../model/invoice";
import {InvoiceProvider} from "../../provider/invoice.provider";
import {InvoiceService} from "../../service/invoice.service";

@Component({
    selector: 'app-invoice-new',
    templateUrl: './new.component.html'
})
export class NewInvoiceComponent extends NewComponent {
    prefix = 'INVOICE'

    constructor(
        protected router: Router,
        protected progress: NgProgress,
        protected titleService: Title,
        protected toasterService: ToastrService,
        protected fb: FormBuilder,
        protected provider: InvoiceProvider,
        private service: InvoiceService,
        protected translate: TranslateService,
    ) {
        super(router, progress, titleService, toasterService, fb, provider, translate);
        this.model = new Invoice();
        this.statelink.page = '/dashboard/invoice';

        this.service.init(this.model);
    }

    createForm(): void {
        this.form = this.service.createForm();
    }

    getMoreInfo(): void {
        this.model.state = 'NONE';
        super.getMoreInfo();
    }

}
