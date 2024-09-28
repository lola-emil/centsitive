import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../repository/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-page',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './add-user-page.component.html',
  styleUrl: './add-user-page.component.css'
})
export class AddUserPageComponent {

  constructor(
    private userRepo: UserService,
    private router: Router
  ) { }

  error = "";


  regFormGroup = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirm_password: new FormControl(""),
  });

  register() { 

    if (this.regFormGroup.value.password != this.regFormGroup.value.confirm_password) {
      this.error = "Password doesn't match";
      return;
    }

    this.userRepo.insert({
      firstname: this.regFormGroup.value.firstname ?? "",
      lastname: this.regFormGroup.value.lastname ?? "",
      email: this.regFormGroup.value.email ?? "",
      password: this.regFormGroup.value.password ?? ""
    })
    .subscribe({
      next: val => {
        this.router.navigateByUrl("/users");
      },
      error: error => {
        const message = error.error.message;
        this.error = message;
      }
    })
  }

}
