import {Component} from '@angular/core';
import {AFormComponent} from "./a.form.component";

@Component({
    selector: 'app-form-number',
    templateUrl: './input.component.html'
})
export class FormNumberComponent extends AFormComponent{
    type = 'number';
}
