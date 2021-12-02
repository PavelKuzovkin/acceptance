import {AbstractControl, ValidationErrors} from '@angular/forms';

export class AppValidators {

    static MatchPassword(AC: AbstractControl): ValidationErrors | null {
        const formGroup = AC.parent;
        if (formGroup) {
            const passwordControl = formGroup.get('password'); // to get value in input tag
            const confirmPasswordControl = formGroup.get('confirmPassword'); // to get value in input tag

            if (passwordControl && confirmPasswordControl) {
                const password = passwordControl.value;
                const confirmPassword = confirmPasswordControl.value;
                if (password && confirmPassword) {
                    if (password !== confirmPassword) {
                        return {matchPassword: true};
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }
        }

        return null;
    }
}
