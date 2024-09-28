import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../repository/user/user.service';

@Component({
  selector: 'app-edit-user-page',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.css'
})
export class EditUserPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private userRepo : UserService
  ) {}

  userId!: string;
  user: any = {};
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userRepo.get({
      user_id: this.userId
    })
    .subscribe({
      next: (val: any) => {
        const user = val[0];

        this.user = user;

        this.editFormGroup = new FormGroup({
          firstname: new FormControl(user.firstname) ?? undefined,
          lastname: new FormControl(user.lastname) ?? undefined,
          email: new FormControl(user.email) ?? undefined,
          password: new FormControl("") ?? undefined,
          confirm_password: new FormControl("") ?? undefined,
        });
        
      },
      error: err => {
        this.error = err.error.message;
      }
    })
    ;
  }

  error = "";

  editFormGroup = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirm_password: new FormControl(""),
  });

  editUser() {

    this.userRepo.edit(this.userId, {
      firstname: this.editFormGroup.value.firstname,
      lastname: this.editFormGroup.value.lastname,
      email: this.editFormGroup.value.email,
      password: this.editFormGroup.value.password
    })
    .subscribe({
      next: value => {
        console.log(value);

        this.router.navigateByUrl("/users");
      },
      error: err => {
        this.error = err.error.message;
      }
    });
  }

  deactivateAccount() {
    this.userRepo.edit(this.userId, {
      status: "inactive"
    }).subscribe({
      next: val => {
        this.router.navigateByUrl("/users");
      }
    })
  }

  activateAccount() {
    this.userRepo.edit(this.userId, {
      status: "active"
    }).subscribe({
      next: val => {
        this.router.navigateByUrl("/users");
      }
    })
  }


}
