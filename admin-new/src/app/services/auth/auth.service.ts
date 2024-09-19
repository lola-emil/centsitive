import { Injectable } from '@angular/core';
import { UserService } from '../../repository/user/user.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userRepo: UserService,
    private storage: LocalStorageService
  ) { }

  signin(email: string, password: string) {
    this.userRepo.signin(email, password)
    .subscribe((val => {
      this.storage.set("USER_INFO", JSON.stringify(val));
    }));
  }

  getUserInfo() {
    let userInfoFromStorage = this.storage.get("USER_INFO");
    let userInfo = null;

    if (userInfoFromStorage != null)
      userInfo = JSON.parse(userInfoFromStorage);

    return userInfo;
  }

  isAuthenticated() {
    return this.storage.get("USER_INFO") != null;
  }

  logout() {
    this.storage.remove("USER_INFO");
  }
}
