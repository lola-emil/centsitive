import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../repository/auth/auth.service';
import { ApiResponse } from '../../shared/types/api-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  alertVisible = false;

  loginForm = this.formBuilder.group({
    email: "",
    password: ""
  });

  error = "";

  onSubmit() {
    this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!).subscribe(response => {
        if (response instanceof HttpErrorResponse) {
          this.error = (<ApiResponse<any>>response.error).message;
          this.alertVisible = true;
        }
      });
  }
}
