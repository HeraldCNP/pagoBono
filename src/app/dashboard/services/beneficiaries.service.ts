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



  get token(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    return token;
  }

  get headers(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return headers;
  }


  getAllUsers(): Observable<any> {
    const url = `${this.baseUrl}/persona`;
    const header = this.headers;
    return this.http.get<any>(url, { headers: header });
  }

  createBeneficiary(data: any): Observable<any> {
    const url = `${this.baseUrl}/persona`;
    const header = this.headers;
    return this.http.post<any>(url, data, { headers: header });
    // return this.http.post<any>(url, data, { headers });
  }

  getBeneficiaryById(id:any){
    const url = `${this.baseUrl}/persona/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, {headers: header});
    // return this.http.get<any>(url+id, { headers });
  }

  // editBeneficiary(form: any, id: any): Observable<any> {
  //   let dir = `${this.URL}/proveedor/${id}`;
  //   return this.http.put<any>(dir, form)
  // }

  editBeneficiary(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/persona/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, {headers: header});
  }

  deleteBeneficiary(id: any): Observable<any> {
    const url = `${this.baseUrl}/persona/${id}`;
    const header = this.headers;
    return this.http.delete<any>(url, {headers: header});
    // return this.http.post<any>(url, { headers });
  }

  createApoderado(data: any): Observable<any> {
    const url = `${this.baseUrl}/apoderados`;
    const header = this.headers;
    return this.http.post<any>(url, data, { headers: header });
    // return this.http.post<any>(url, data, { headers });
  }

  /* Servicios Tipos de Discapacidad */

  getAllTipos(): Observable<any> {
    const url = `${this.baseUrl}/tipo`;
    const header = this.headers;
    return this.http.get<any>(url, { headers: header });
  }

  createTipo(data: any): Observable<any> {
    const url = `${this.baseUrl}/tipo`;
    const header = this.headers;
    return this.http.post<any>(url, data, { headers: header });
  }

  getTipoById(id:any){
    const url = `${this.baseUrl}/tipo/${id}`;
    const header = this.headers;
    return this.http.get<any>(url, { headers: header });
    // return this.http.get<any>(url+id, { headers });
  }

  // editBeneficiary(form: any, id: any): Observable<any> {
  //   let dir = `${this.URL}/proveedor/${id}`;
  //   return this.http.put<any>(dir, form)
  // }

  editTipo(data: any, id: any): Observable<any> {
    const url = `${this.baseUrl}/tipo/${id}`;
    const header = this.headers;
    return this.http.patch<any>(url, data, { headers: header });
    // return this.http.post<any>(url, data, { headers });
  }

  deleteTipo(id: any): Observable<any> {
    const url = `${this.baseUrl}/tipo/${id}`;
    const header = this.headers;
    return this.http.delete<any>(url, { headers: header });
  }


  /* END Servicios Tipos de Discapacidad */
}
