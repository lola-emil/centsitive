import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../repository/user/user.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {

  constructor(
    private authService: AuthService,
    private storageService: LocalStorageService,
    private router: Router
  ) { }

  signInFormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  error = "";

  signIn() {
    this.authService.signin(
      this.signInFormGroup.value.username ?? "",
      this.signInFormGroup.value.password ?? "")
      .subscribe(
        {
          next: (val) => {
            this.error = "";

            this.storageService.set("USER_INFO", JSON.stringify((val as any).data));
            this.router.navigateByUrl("/");
          },

          error: (err) => {
            console.log(err);
            this.error = err.error.message;
          },
        }
      );
  }


}
