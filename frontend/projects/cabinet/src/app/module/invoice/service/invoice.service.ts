import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IInvoice} from "../model/invoice";

@Injectable()
export class InvoiceService {
    model: IInvoice | undefined;
    form: FormGroup | undefined;

    constructor(
        private fb: FormBuilder
    ) {
    }

    init(model: IInvoice): void {
        this.model = model;
    }

    createForm(): FormGroup {
        this.form = this.fb.group({
            id: [this.model?.id],
            invoiceNumber: [this.model?.invoiceNumber, Validators.required],
            wagonNumber: [this.model?.wagonNumber, Validators.required],
            weightBefore: [this.model?.weightBefore, Validators.required],
        });

        return this.form;
    }
}
