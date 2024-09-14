import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/types/api-response';
import { Observable, catchError, of } from 'rxjs';

export interface Record {
  record_id?: string;
  note: string;
  category: string;
  amount: number;
  created_at?: string;
  user_id?: string
}

export interface Overview {
  category: string;
  total_expense: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(error);
    };
  }


  getOverview(userId: string, token: string) {
    return this.http.get<ApiResponse<{overview: Overview[], records: Record[]}>>(`http://localhost:5000/records`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  getRecentRecords(userId: string, token: string) {
    return this.http.get<ApiResponse<{overview: Overview[], records: Record[]}>>(`http://localhost:5000/records?limit=5`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
  }

  getRecords(token: string) {
    return this.http.get<ApiResponse<{overview: Overview[], records: Record[]}>>(`http://localhost:5000/records`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
  }

  addRecord(formdata: Record, token: string) {
    return this.http.post<ApiResponse<any>>("http://localhost:5000/records", formdata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
    .pipe(catchError(this.handleError('addRecord')));
  }

  searchRecord(searchTerm: string, token: string) {
    return this.http.get<ApiResponse<{overview: Overview[], records: Record[]}>>(`http://localhost:5000/records?q=${searchTerm}`,
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
  }

  deleteRecord(recordId: string, token: string) {
    return this.http.delete<ApiResponse<any>>(`http://localhost:5000/records/${recordId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
  }
}
