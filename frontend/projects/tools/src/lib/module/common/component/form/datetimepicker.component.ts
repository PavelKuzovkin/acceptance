import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AFormComponent} from "./a.form.component";

interface DateAndTime {
    date: Date;
    time: Date;
}

@Component({
    selector: 'app-datetime-picker',
    templateUrl: './datetimepicker.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatetimePickerComponent),
        multi: true
    }]
})
export class DatetimePickerComponent extends AFormComponent implements ControlValueAccessor {
    private onChange: ((value: Date) => void) | undefined;

    datetime: Date = new Date();
    tempForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        super();
        this.tempForm = this.fb.group({
            date: [this.form?.get(this.field)?.value],
            time: [this.form?.get(this.field)?.value]
        });
        this.onChanges();
    }

    private onChanges(): void {
        // listen for changes, and recombinate internal datetime when they occur
        this.tempForm.valueChanges.subscribe((f: DateAndTime) => this.setDatetime(f));

        this.form?.get(this.field)?.valueChanges.subscribe(date => {
            console.log(date);
        })
    }

    private setDatetime(d: DateAndTime) {
        console.log(d);
        if (!d.date)
            d.date = new Date();
        this.datetime.setFullYear(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
        if (!d.time)
            d.time = new Date();
        this.datetime.setHours(d.time.getHours(), d.time.getMinutes(), 0, 0);

        this.form?.get(this.field)?.setValue(this.datetime);
        // @ts-ignore
        this.onChange(this.datetime);
    }

    writeValue(value: Date): void {
        console.log(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void { }

    setDisabledState?(isDisabled: boolean): void { }
}
