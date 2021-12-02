import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {CountryISO, SearchCountryField, TooltipLabel} from 'ngx-intl-tel-input';

@Component({
    selector: 'app-form-tel-input',
    templateUrl: './tel.input.component.html'
})
export class FormTelInputComponent  {
    @Input() form: FormGroup;
    @Input() field: string;
    @Input() required = false;
    @Input() icon = '';
    @Input() placeholder = '';
    @Input() submitted: boolean;
    @Input() label = '';

    separateDialCode = true;
    SearchCountryField = SearchCountryField;
    TooltipLabel = TooltipLabel;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
}
