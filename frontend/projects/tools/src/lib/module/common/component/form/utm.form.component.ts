import {Component, Input, OnInit} from '@angular/core';
import {AFormComponent} from "./a.form.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UtmHelpModalComponent} from "./utm.help.modal.component";

@Component({
    selector: 'app-form-utm',
    templateUrl: './utm.form.component.html',
    styleUrls: ['./utm.form.component.css']
})
export class UtmFormComponent extends AFormComponent implements OnInit {
    type = 'text';
    bsModalRef: BsModalRef | undefined;
    parameter = '';
    @Input() requiredParameter = true;

    constructor(
        private modalService: BsModalService
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.parameter = 'utm_' + this.field.match(/[A-Z][a-z]+/g)?.join('_').toLowerCase();
    }

    showHelp(): false {
        const initialState = {
            parameter: this.parameter,
            required: this.requiredParameter
        };
        this.bsModalRef = this.modalService.show(UtmHelpModalComponent, {initialState});

        return false;
    }
}
