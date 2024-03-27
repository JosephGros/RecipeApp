import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router){}

  handleSubmit(){
    const loginData = this.loginForm.value;
    this.loading = true;
    this.auth.login(loginData as LoginDetails).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error: ', error);
        this.error = "Invalid email or password. Please try again!";
      }
    });
  }
}
