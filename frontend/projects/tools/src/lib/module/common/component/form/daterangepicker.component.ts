import {Component, Input, OnInit} from '@angular/core';
import {AFormComponent} from "./a.form.component";
import * as moment from "moment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DateService, IDateRange} from "../../service/date.service";

@Component({
    selector: 'app-form-daterangepicker',
    templateUrl: './daterangepicker.component.html'
})
export class FormDaterangepickerComponent extends AFormComponent implements OnInit {
    @Input() prefix: string = '';
    @Input() helper: boolean = false;

    minDate: Date;
    tempForm: FormGroup | undefined;
    clickFast: any = {};

    constructor(
        private fb: FormBuilder,
        private dateService: DateService
    ) {
        super();
        this.minDate = new Date();
    }

    ngOnInit() {
        const from = this.form?.get(this.field + 'From')?.value;
        const to = this.form?.get(this.field + 'To')?.value;

        this.tempForm = this.fb.group({
            dateFrom: [from],
            timeFrom: [from],
            dateTo: [to],
            timeTo: [to]
        });

        this.tempForm.valueChanges.subscribe(temp => {
            this.updateDateFrom(temp);
            this.updateDateTo(temp);
        });

        if (!this.label) {
            this.label = (this.prefix + '.FIELD.' + this.field).toUpperCase();
        }
    }

    updateDateFrom(temp: any) {
        let val;
        if (!temp.dateFrom && temp.timeFrom){
            val = temp.timeFrom;
            this.tempForm?.get('dateFrom')?.setValue(val, {emitEvent: false});
        }
        if (temp.dateFrom && !temp.timeFrom){
            val = temp.dateFrom;
            this.tempForm?.get('timeFrom')?.setValue(val, {emitEvent: false});
        }
        if (temp.dateFrom && temp.timeFrom){
            val = moment(moment(temp.dateFrom).format('YYYY-MM-DD') + ' ' + moment(temp.timeFrom).format('HH:mm:ss')).toDate();
        }
        if (val) {
            this.form?.get(this.field + 'From')?.setValue(val);
        }
        if (this.clickFast.from != val) {
            this.clickFast = {};
            this.form?.removeControl('custom_' + this.field);
        }
    }

    updateDateTo(temp: any) {
        let val;
        if (!temp.dateTo && temp.timeTo){
            val = temp.timeTo;
            this.tempForm?.get('dateTo')?.setValue(val, {emitEvent: false});
        }
        if (temp.dateTo && !temp.timeTo){
            val = temp.dateTo;
            this.tempForm?.get('timeTo')?.setValue(val, {emitEvent: false});
        }
        if (temp.dateTo && temp.timeTo){
            val = moment(moment(temp.dateTo).format('YYYY-MM-DD') + ' ' + moment(temp.timeTo).format('HH:mm:ss')).toDate();
        }
        if (val) {
            this.form?.get(this.field + 'To')?.setValue(val);
        }
        if (this.clickFast.to != val) {
            this.clickFast = {};
            this.form?.removeControl('custom_' + this.field);
        }
    }

    setFastDateRange(rangeName: string) {
        const range: IDateRange = this.dateService.getFastDateRange(rangeName);
        this.updateForm(range.from, range.to);
        this.form?.addControl('custom_' + this.field, new FormControl(rangeName))

        this.clickFast = {
            from: range.from, to: range.to
        }
    };

    updateForm(from: Date, to: Date) {
        const keyFrom = `${this.field}From`;
        const keyTo = `${this.field}To`;

        this.tempForm?.get('dateFrom')?.setValue(from, {emitEvent: false});
        this.tempForm?.get('timeFrom')?.setValue(from, {emitEvent: false});
        this.tempForm?.get('dateTo')?.setValue(to, {emitEvent: false});
        this.tempForm?.get('timeTo')?.setValue(to, {emitEvent: false});
        this.form?.get(keyFrom)?.setValue(from, {emitEvent: false});
        this.form?.get(keyTo)?.setValue(to, {emitEvent: false});
    }
}
