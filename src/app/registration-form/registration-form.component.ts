import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonComponent} from "../ui/button/button.component";
import {InputComponent} from "../ui/input/input.component";
import {HeaderComponent} from "../ui/header/header.component";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    HeaderComponent
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'surname': new FormControl(null, [Validators.required]),
      'experience': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
