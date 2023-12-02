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

  getAllPlanillas(): Observable<any> {
    const url = `${this.baseUrl}/planillas`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log(url);

    return this.http.get<any>(url, { headers });
  }

  upload(file: File, form:FormGroup): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    this.formData =
    formData.append('gestion', form.value.gestion);
    formData.append('mes', form.value.mes);
    formData.append('file', file);


    const req = new HttpRequest('POST', `${this.baseUrl}/persona/actPersona`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


}
