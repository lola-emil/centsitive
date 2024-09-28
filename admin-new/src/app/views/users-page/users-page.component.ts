import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserService } from '../../repository/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
  providers: [DatePipe]
})
export class UsersPageComponent implements OnInit {


  constructor(
    private userRepo: UserService,
  ) { }


  users: any = [];

  searchQuery: string = "";

  ngOnInit(): void {
    this.userRepo.get().subscribe(val => {
      this.users = val;

      console.log(this.users);
    });
  }

  search(val: Event) {
    const target = val.target as HTMLInputElement;

    this.userRepo.search(target.value)
      .subscribe(val => {
        this.users = val;
      });
  }

}
