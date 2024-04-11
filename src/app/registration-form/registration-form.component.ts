import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ButtonComponent} from "../ui/button/button.component";
import {InputComponent} from "../ui/input/input.component";
import {HeaderComponent} from "../ui/header/header.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workingExperience: ['', [Validators.required, this.decimalPlacesValidator(1)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else if (this.form.get('name')) {
      console.log('invalid!');
    }
  }
  resetForm() {
    this.form.reset();
    console.log('reset')
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
