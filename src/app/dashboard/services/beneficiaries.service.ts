import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Beneficiary } from '../interfaces/beneficiary';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService)

  private beneficiaries = signal<Beneficiary | null>(null);

  constructor() { }




  getAllUsers(): Observable<any> {
    const url = `${this.baseUrl}/persona`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.get<any>(url, { headers });
  }

  createBeneficiary(data: any): Observable<any> {
    const url = `${this.baseUrl}/persona`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.post<any>(url, data);
    // return this.http.post<any>(url, data, { headers });
  }

  getBeneficiaryById(id:any){
    const url = `${this.baseUrl}/persona/${id}`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.get<any>(url);
    // return this.http.get<any>(url+id, { headers });
  }

  // editBeneficiary(form: any, id: any): Observable<any> {
  //   let dir = `${this.URL}/proveedor/${id}`;
  //   return this.http.put<any>(dir, form)
  // }

  editBeneficiary(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/persona/${id}`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.patch<any>(url, data);
    // return this.http.post<any>(url, data, { headers });
  }

  deleteBeneficiary(id: any): Observable<any> {
    const url = `${this.baseUrl}/persona/${id}`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.delete<any>(url);
    // return this.http.post<any>(url, { headers });
  }
}
