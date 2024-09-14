import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ApiResponse } from '../../shared/types/api-response';
import { Router } from '@angular/router';


export interface UserInfo {
  name: string;
  token: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private route: Router) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(error);
    };
  }

  login(email: string, password: string) {
    return this.http.post<ApiResponse<UserInfo>>("http://localhost:5000/auth/login", { email, password })
      .pipe(
        tap(response => {

          const userInfo = (<ApiResponse<UserInfo>>response).data;

          localStorage.setItem("USER_INFO", JSON.stringify(userInfo));

          // Navigate to dashboard if login successful
          this.route.navigate(["/"]);
        }),
        catchError(this.handleError('login', [])));
  }

  isAuthenticated() {

    if (localStorage.getItem("USER_INFO"))
      return true;

    return false;
  }

  getUserInfo() {
    const result = JSON.parse(localStorage.getItem("USER_INFO") ?? "{}");

    return result as UserInfo;
  }

  updatePassword(currentPassword: string, newPassword: string, confirmPassword: string, token: string) {
    return this.http.post("http://localhost:5000/user/update-password", 
      {currentPassword, newPassword, confirmPassword},
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(this.handleError('update-password', []))
    )
  }

  logout() {
    localStorage.removeItem("USER_INFO");
    this.route.navigate(["/login"]);
  }

}
