import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    inputType: 'text' | 'password' = 'password';
    password: string = '';
    strength: 'empty' | 'small' | 'easy' | 'medium' | 'strong' = 'empty';

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

    getStrength(
        password: string
    ): 'empty' | 'small' | 'easy' | 'medium' | 'strong' | 'error' {
        //easy
        const onlyLettersRegex = /^[a-zA-Z]+$/;
        const onlyDigitsRegex = /^\d+$/;
        const onlySymbolsRegex = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/;
        //medium
        const LettersDigitsCombinationRegex =
            /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
        const LettersSymbolsCombinationRegex =
            /^(?=.*?[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])(?=.*?[a-zA-Z])[a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/;
        const DigitsSymbolsCombinationRegex =
            /^(?=.*?\d)(?=.*?[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]+$/;
        //strong
        const LettersDigitsSymbolsCombinationRegex =
            /^(?=.*?\d)(?=.*?[a-zA-Z])(?=.*?[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]+$/;

        //order metters
        if (password === '') {
            return 'empty';
        }

        if (password.length < 8) {
            return 'small';
        }

        if (
            onlyLettersRegex.test(password) ||
            onlyDigitsRegex.test(password) ||
            onlySymbolsRegex.test(password)
        ) {
            return 'easy';
        }

        if (
            LettersDigitsCombinationRegex.test(password) ||
            LettersSymbolsCombinationRegex.test(password) ||
            DigitsSymbolsCombinationRegex.test(password)
        ) {
            return 'medium';
        }

        if (LettersDigitsSymbolsCombinationRegex.test(password)) {
            return 'strong';
        }

        return 'error';
    }

    onPasswordInputChange(changeEvent: string) {
        this.password = changeEvent;
        const validationResult = this.getStrength(this.password);

        if (validationResult === 'error') {
            window.alert('validation error');
        } else {
            this.strength = validationResult;
        }
    }
}
