import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService)

  constructor() { }

  get token() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    return token;
  }

  get headers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return headers;
  }


  getReport(params?: any): Observable<any> {
    const url = `${this.baseUrl}/planillas/query/all`;
    // console.log(params);

    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(url, { params: httpParams, headers: header });


    // return this.http.get(`${this.baseUrl}/planillas/query/all1`, { params: httpParams, headers: header, responseType: 'blob' });
  }

  getPlanillas(params?: any): Observable<any> {
    const url = `${this.baseUrl}/planillas`;
    // console.log(params);

    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<any>(url, { params: httpParams, headers: header });


    // return this.http.get(`${this.baseUrl}/planillas/query/all1`, { params: httpParams, headers: header, responseType: 'blob' });
  }

  generateBoleta(ci: string): Observable<Blob> {
    const header = this.headers;

    // return this.http.get<{ url: string }>(`${this.baseUrl}/proyect/getInfoProject/${projectId}`, { headers: header, responseType: 'blob' });
    return this.http.get(`${this.baseUrl}/planillas/getControlPago/filter?ci=${ci}`, { headers: header, responseType: 'blob' });
  }

  imprimir(params?: any): Observable<Blob> {
    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    // return this.http.get<{ url: string }>(`${this.baseUrl}/proyect/getInfoProject/${projectId}`, { headers: header, responseType: 'blob' });
    return this.http.get(`${this.baseUrl}/planillas/query/getPlanillaGeneral`, { params: httpParams, headers: header, responseType: 'blob' });
  }

  imprimirEstado(params?: any): Observable<Blob> {
    const header = this.headers;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get(`${this.baseUrl}/planillas/query/getPlanillaEstado`, { params: httpParams, headers: header, responseType: 'blob' });
  }

  // return this.http.get(`${this.baseUrl}/planillas/query/all1`, { params: httpParams, headers: header, responseType: 'blob' });
}