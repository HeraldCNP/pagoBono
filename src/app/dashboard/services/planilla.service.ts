import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService)

  // private beneficiaries = signal<Beneficiary | null>(null);
  formData:any;
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

  getAllPlanillas(): Observable<any> {
    const url = `${this.baseUrl}/planillas`;
    const header = this.headers;
    // console.log(url);
    return this.http.get<any>(url, { headers: header });
  }

  getPlanilla(id:string): Observable<any> {
    const url = `${this.baseUrl}/planillas/${id}`;
    const header = this.headers;
    // console.log(url);
    return this.http.get<any>(url, { headers: header });
  }

  registerPago(form:any): Observable<any> {
    const url = `${this.baseUrl}/persona/addPago`;
    const header = this.headers;
    // console.log(url);
    return this.http.post<any>(url, form, { headers: header });
  }



  upload(file: File, form:FormGroup): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const header = this.headers;
    this.formData =
    formData.append('gestion', form.value.gestion);
    formData.append('mes', form.value.mes);
    formData.append('file', file);


    const req = new HttpRequest('POST', `${this.baseUrl}/persona/actPersona`, formData,  {
      reportProgress: true,
      responseType: 'json',
      headers: header
    });
    return this.http.request(req);
  }


  getInfoPlanilla(planillaId: string): Observable<Blob> {
    const header = this.headers;

    return this.http.get(`${this.baseUrl}/planillas/getInfoPlanilla/${planillaId}`, { headers: header, responseType: 'blob' });
  }

  printPlanilla(planillaId: string): Observable<Blob> {
    const header = this.headers;

    // return this.http.get<{ url: string }>(`${this.baseUrl}/proyect/getInfoProject/${projectId}`, { headers: header, responseType: 'blob' });
    return this.http.get(`${this.baseUrl}/planillas/getPlanilla/${planillaId}`, { headers: header, responseType: 'blob' });
  }

}
