import {Component, Input} from "@angular/core";
import {AFormComponent} from "./a.form.component";

export interface IRadioButton {
    label: string;
    val: any;
}

@Component({
    selector: 'app-form-radio',
    templateUrl: './radio.component.html'
})
export class FormRadioComponent extends AFormComponent{
    @Input() inline = true;
    @Input() list: IRadioButton[] = []
}
