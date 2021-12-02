import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-form-error',
    templateUrl: './error.component.html'
})

export class FormErrorComponent {
    @Input() errors: any = {};

    prefix = 'COMMON.VALIDATE.';
}
