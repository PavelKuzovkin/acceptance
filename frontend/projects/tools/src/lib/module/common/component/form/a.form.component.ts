import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
    template: ''
})
export abstract class AFormComponent implements OnInit {
    @Input() form: FormGroup| undefined;
    @Input() field: string = '';
    @Input() required = false;
    @Input() icon = '';
    @Input() placeholder = '';
    @Input() submitted: boolean = false;
    @Input() label = '';
    @Input() showLabel = true;
    @Input() prefix = '';
    @Input() helper = false;
    @Input() helperText: string = ''!;

    ngOnInit() {
        if (!this.label) {
            this.label = (this.prefix + '.FIELD.' + this.field).toUpperCase();
        }

        this.helperText = this.helperText ?  this.helperText : (this.prefix + '.HELPER.' + this.field).toUpperCase();
    }
}
