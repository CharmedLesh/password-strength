import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { StrengthBarComponent } from './components/strength-bar/strength-bar.component';

@NgModule({
    declarations: [AppComponent, PasswordInputComponent, StrengthBarComponent],
    imports: [BrowserModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
