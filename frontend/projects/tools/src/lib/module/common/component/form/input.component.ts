import {Component, Input} from '@angular/core';
import {AFormComponent} from "./a.form.component";

@Component({
    selector: 'app-form-input',
    templateUrl: './input.component.html'
})
export class FormInputComponent extends AFormComponent{
    @Input() showLabel = true;
    type = 'text';
}
