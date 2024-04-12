import {ChangeDetectorRef, Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ButtonComponent} from "../ui/button/button.component";
import {InputComponent} from "../ui/input/input.component";
import {HeaderComponent} from "../ui/header/header.component";
import {CommonModule} from "@angular/common";
import {MessageComponent} from "../ui/message/message.component";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    CommonModule,
    MessageComponent
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  form: FormGroup;
  emailFocused: boolean = false;
  nameFocused: boolean = false;
  surnameFocused: boolean = false;
  experienceFocused: boolean = false;
  displayMessage: string = '';
  messageType: 'info' | 'error' | 'success' = 'info';
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workingExperience: ['', [Validators.required, this.decimalPlacesValidator(1)]],
    });
  }

  onSubmit(): void {
    this.displayMessage = '';
    this.messageType = 'info';
    this.cd.detectChanges();
    setTimeout(() => {
      if (this.form.valid) {
        this.displayMessage = 'Registration success.';
        this.messageType = 'success';
      } else {
        this.displayMessage = 'Please check the form for errors.';
        this.messageType = 'error';
      }
      this.cd.detectChanges();
    }, 0);
  }

  resetForm() {
    this.form.reset();
  }

  decimalPlacesValidator(decimalPlaces: number = 1): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const valueAsString = control.value.toString().replace(',', '.');
      const isNumber = Number.isFinite(Number(valueAsString));
      const comaIndex = valueAsString.indexOf('.');
      let isValid = true;
      if (comaIndex !== -1) {
        const decimalPartLength = valueAsString.length - comaIndex - 1;
        isValid = decimalPartLength <= decimalPlaces;
      }
      return isNumber && isValid ? null : { 'decimalPlaces': { value: control.value } };
    };
  }
}
