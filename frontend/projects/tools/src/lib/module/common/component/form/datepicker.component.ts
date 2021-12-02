import {Component, Input} from '@angular/core';
import {AFormComponent} from "./a.form.component";

@Component({
    selector: 'app-form-datepicker',
    templateUrl: './datepicker.component.html'
})
export class FormDatepickerComponent extends AFormComponent{
    @Input() prefix: string = '';
    @Input() helper: boolean = false;
    @Input() minDate: Date = new Date();
}
