import {Component} from '@angular/core';
import {AFormComponent} from "./a.form.component";

@Component({
    selector: 'app-form-password',
    templateUrl: './input.component.html'
})
export class FormPasswordComponent extends AFormComponent{
    type = 'password';
}
