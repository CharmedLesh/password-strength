import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PasswordStrengthService {
    private passwordStrength = new BehaviorSubject('empty');
    currentPasswordStrength = this.passwordStrength.asObservable();

    constructor() {}

    updatePassword(password: string) {
        this.passwordStrength.next(this.getPasswordStrength(password));
    }

    private getPasswordStrength(
        password: string
    ): 'empty' | 'short' | 'easy' | 'medium' | 'strong' | 'error' {
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
            return 'short';
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
}
