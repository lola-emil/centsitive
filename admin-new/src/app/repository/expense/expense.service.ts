import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LocalStorageService, UserInfo } from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }

  info = JSON.parse(this.storage.get("USER_INFO") ?? "{}") as UserInfo;


  get(query?: any) {
    const urlQueryParams = new URLSearchParams(query);

    return this.http.get(`${environment.apiUrl}/expense-admin/expenses?${urlQueryParams.toString()}`, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }

  getById(id: any) {
    return this.http.get(`${environment.apiUrl}/expense-admin/expenses/${id}`, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }

  getRecent() {
    return this.http.get(`${environment.apiUrl}/expense-admin/recent-activities/`, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }


  getTotal() {
    return this.http.get(`${environment.apiUrl}/expense-admin/total`, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    });
  }


  updateById(id: any, data: any) {
    return this.http.put(`${environment.apiUrl}/expense-admin/expenses/${id}`, data, {
      headers: {
        "Authorization": `Bearer ${this.info.token}`
      }
    })
  }
}
