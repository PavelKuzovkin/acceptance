import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IUser} from "../model/user";

@Injectable()
export class UserService {
    model: IUser | undefined;
    form: FormGroup | undefined;

    constructor(
        private fb: FormBuilder
    ) {
    }

    init(model: IUser): void {
        this.model = model;
    }

    createForm(): FormGroup {
        this.form = this.fb.group({
            id: [this.model?.id],
            clientId: [this.model?.clientId],
            login: [this.model?.login],
            password: [this.model?.password],
            securQuestion: [this.model?.securQuestion],
            securPin: [this.model?.securPin],
            isLocked: [this.model?.id],
        });

        return this.form;
    }
}
