import {Component, Input} from '@angular/core';
import {AFormComponent} from "./a.form.component";

@Component({
    selector: 'app-form-select',
    templateUrl: './select.component.html'
})
export class FormSelectComponent extends AFormComponent{
    @Input() showLabel = true;
    @Input() list: any[] = [];
    @Input() titleField = 'title';
    @Input() multiselect = false;
}
