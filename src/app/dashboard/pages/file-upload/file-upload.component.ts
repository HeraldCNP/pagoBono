import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Seleccione un archivo con la extención .xls';
  fileInfos?: Observable<any>;
  private uploadService = inject(FileUploadService)
  private snackBar = inject(MatSnackBar)
  private router = inject(Router)

  constructor() { }

  ngOnInit(): void {
    // this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Seleccione un archivo con la extención .xls';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
            console.log(event);
          } else if (event instanceof HttpResponse) {
            console.log(event);

            this.snackBar.open('Registro Exitoso', 'Cerrar', {
              duration: 3000
            });

            this.router.navigate(['dashboard/beneficiaries']);


            // this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });
    }

  }
}
