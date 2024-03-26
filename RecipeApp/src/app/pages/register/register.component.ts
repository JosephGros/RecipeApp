import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
      ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(25)
    ]),
    lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(25)
      ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
      ]),
    password_confirmation: new FormControl('', Validators.required),
  });

  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router){}

  registerSubmit() {
    const registerData = this.registerForm.value;
    this.loading = true;
    this.auth.register(registerData as Register).subscribe(
      (result) => {
        console.log('Registration successful!', result);
        this.loading = false;
        this.router.navigate(['/signin']);
      },
      (error) => {
        console.error('Registration failed: ', error);
        this.loading = true;
        this.error = "Registration failed. Please try again.";
      }
    )
  }

}
