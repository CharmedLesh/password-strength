import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PasswordStrengthService } from '../../services/password-strength.service';

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements OnInit {
    constructor(private passwordStrengthService: PasswordStrengthService) {}

    passwordControl = new FormControl<string>('');
    inputType: 'text' | 'password' = 'password';

    ngOnInit() {
        this.passwordControl.valueChanges.subscribe((value) => {
            if (value) {
                this.passwordStrengthService.updatePassword(value);
            } else {
                this.passwordStrengthService.updatePassword('');
            }
        });
    }

    visibilityButtonClick() {
        switch (this.inputType) {
            case 'text':
                this.inputType = 'password';
                break;
            case 'password':
                this.inputType = 'text';
                break;
            default:
                this.inputType = 'password';
                break;
        }
    }
}
