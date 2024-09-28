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

  get(query?: any) {
    const urlQueryParams = new URLSearchParams(query);
    return this.http.get(`${environment.apiUrl}/user-admin?${urlQueryParams.toString()}`, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }

  insert(body: any) {
    return this.http.post(`${environment.apiUrl}/user-admin`, body,{
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }

  edit(id: string, body: any) {
    return this.http.put(`${environment.apiUrl}/user-admin/${id}`, body, {
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
