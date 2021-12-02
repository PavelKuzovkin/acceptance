import {Component, OnInit} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-utm-help',
    templateUrl: './utm.help.modal.component.html'
})
export class UtmHelpModalComponent implements OnInit {
    description = '';
    used = '';
    examples = [];
    parameter = '';
    required = true;

    prefix = 'LINK.HELP.'

    constructor(
        public bsModalRef: BsModalRef,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        const pref = 'LINK.HELP.FIELD.' + this.toTranslateFormat(this.parameter);
        this.translate.get([pref]).subscribe(mess => {
            this.description = mess[pref].DESCRIPTION;
            this.used = mess[pref].USED;
            this.examples = mess[pref].EXAMPLES;
        })
    }

    private toTranslateFormat(str: string) {
        return str.replace(/_/g, '').toUpperCase();
    }
}
