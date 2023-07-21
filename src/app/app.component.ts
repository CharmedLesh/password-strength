import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    inputType: 'text' | 'password' = 'password';

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
