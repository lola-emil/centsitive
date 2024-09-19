import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }


  signin(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/signin`, { email, password });
  }
}
