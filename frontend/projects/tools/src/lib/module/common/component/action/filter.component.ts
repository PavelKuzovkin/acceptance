import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ActivatedRoute, Router} from "@angular/router";
import {DateService, IDateRange} from "../../service/date.service";
import * as moment from "moment";

@Component({
    template: ''
})
export abstract class FilterComponent implements OnInit {
    model: any;
    form: FormGroup | undefined;
    submitted = false;
    dateKeys: string[] = [];

    protected constructor(
        protected fb: FormBuilder,
        public bsModalRef: BsModalRef,
        protected router: Router,
        protected route: ActivatedRoute,
        protected dateService: DateService
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm(): FormGroup {
        this.form = this.fb.group({});
        return this.form;
    }

    getDefaultValues() {
        this.route.queryParams.forEach(params => {
            for (let key in params) {
                if (this.dateKeys.indexOf(key) >= 0) {
                    const range: IDateRange = this.dateService.getFastDateRange(params[key]);
                    this.form?.get(key + 'From')?.setValue(range.from);
                    this.form?.get(key + 'To')?.setValue(range.to);
                } else {
                    const test = this.dateKeys.find(x => key.startsWith(x));
                    if (test) {
                        this.form?.get(key)?.setValue(moment(params[key]).toDate());
                    } else {
                        let defVal = params[key]
                        if (defVal === 'false')
                            defVal = false;
                        if (defVal === 'true')
                            defVal = true;
                        this.form?.get(key)?.setValue(defVal);
                    }
                }
            }
        });
    }

    reset() {
        this.router.navigate([], { queryParams: {}, relativeTo: this.route});
        this.bsModalRef.hide();
    }
}
