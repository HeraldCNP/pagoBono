import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient)
  formData:any;

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    this.formData =
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/persona/basePersona`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
