import {Component, Input} from '@angular/core';
import {AFormComponent} from "./a.form.component";

@Component({
    selector: 'app-form-text',
    templateUrl: './text.component.html'
})
export class FormTextComponent extends AFormComponent{
    @Input() showLabel = true;
}
