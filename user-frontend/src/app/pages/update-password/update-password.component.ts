import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../repository/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../shared/types/api-response';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}


  error = "";
  message = "";
  
  updatePasswordForm = this.formBuilder.group({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  onSubmit() {
    const userInfo = this.authService.getUserInfo();
    this.authService.updatePassword(
      this.updatePasswordForm.value.currentPassword!,
      this.updatePasswordForm.value.newPassword!,
      this.updatePasswordForm.value.confirmPassword!,
      userInfo.token
    ).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        this.error = (<ApiResponse<any>>response.error).message;
      } else {
        this.error = "";
        this.message = "Password updated"
      }
    })
  }
}
