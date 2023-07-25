import { Component, OnInit } from '@angular/core';
import { PasswordStrengthService } from '../../services/password-strength.service';

@Component({
    selector: 'app-strength-bar',
    templateUrl: './strength-bar.component.html',
    styleUrls: ['./strength-bar.component.scss'],
})
export class StrengthBarComponent implements OnInit {
    constructor(private passwordStrengthService: PasswordStrengthService) {}
    passwordStrength = 'empty';

    ngOnInit() {
        this.passwordStrengthService.currentPasswordStrength.subscribe(
            (value) => {
                if (value === 'error') {
                    window.alert('validation error');
                } else {
                    this.passwordStrength = value;
                }
            }
        );
    }
}
