import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService)

  private users = signal<User | null>(null);

  constructor() { }




  getAllUsers(): Observable<any> {
    const url = `${this.baseUrl}/auth`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.get<any>(url, { headers });
  }

  createUser(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth/register`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.post<any>(url, data, { headers });
  }

  getUserById(id:any){
    const url = `${this.baseUrl}/auth/${id}`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);
    return this.http.get<any>(url);
    // return this.http.get<any>(url+id, { headers });
  }
}
