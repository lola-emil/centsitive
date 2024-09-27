import { Injectable } from '@angular/core';


export type UserInfo = {
  user_id: number,
  name: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
