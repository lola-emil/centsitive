import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, UserInfo } from '../../repository/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthService) {}

  @Input() visible = false;
  @Output() onClickOverlay = new EventEmitter();

  userInfo!: UserInfo;

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo()
  }
  
  hideNav() {
    this.onClickOverlay.emit();
  }

  logout() {
    this.authService.logout();
  }
}
