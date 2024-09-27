import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LocalStorageService, UserInfo } from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }

  info = JSON.parse(this.storage.get("USER_INFO") ?? "{}") as UserInfo;


  signin(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login-admin`, { username, password });
  }

  get() {
    return this.http.get(`${environment.apiUrl}/user-admin`, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }

  search(q: string) {
    return this.http.get(`${environment.apiUrl}/user-admin?q=${q}`, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }
}
