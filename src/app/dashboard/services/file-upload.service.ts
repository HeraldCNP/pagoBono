import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient)
  formData:any;
  private authService = inject(AuthService)

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

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const header = this.headers;
    this.formData = formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/persona/basePersona`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: this.headers
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
