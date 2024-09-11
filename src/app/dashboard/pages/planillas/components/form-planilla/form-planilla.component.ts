import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanillaService } from 'src/app/dashboard/services/planilla.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-planilla',
  templateUrl: './form-planilla.component.html',
  styleUrls: ['./form-planilla.component.css']
})
export class FormPlanillaComponent {
  private fb = inject(FormBuilder);
  
  private planillaService = inject(PlanillaService);

  inputData: any;
  fileName = 'Seleccione un Archivo en formato .xls';
  currentFile?: File;
  progress = 0;
  message = '';
  planillaForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormPlanillaComponent>) {
    this.planillaForm = this.fb.group({
      gestion: ['', [Validators.required]],
      mes: ['', [Validators.required]],
    })
  }




  meses: any[] = [
    { value: 'Enero', label: 'Enero' },
    { value: 'Febrero', label: 'Febrero' },
    { value: 'Marzo', label: 'Marzo' },
    { value: 'Abril', label: 'Abril' },
    { value: 'Mayo', label: 'Mayo' },
    { value: 'Junio', label: 'Junio' },
    { value: 'Julio', label: 'Julio' },
    { value: 'Agosto', label: 'Agosto' },
    { value: 'Septiembre', label: 'Septiembre' },
    { value: 'Octubre', label: 'Octubre' },
    { value: 'Noviembre', label: 'Noviembre' },
    { value: 'Diciembre', label: 'Diciembre' },
  ];

  closeDialog(data: any) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.inputData = this.data;

  }





  get form() {
    return this.planillaForm.controls;
  }

  selectFile(event: any): void {
    const fileExtension = event.target.files[0].name.split('.').pop();
    // if (fileExtension !== 'xls' || fileExtension !== 'xlsx') {
    //   // Mostrar un mensaje de error o realizar otra acción
    //   alert('Solo se permiten archivos .xls o xlsx');
    //   this.currentFile = undefined;
    // }

    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      this.progress = 0;
    } else {
      this.fileName = 'Seleccione un archivo en Formato .xls';
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.currentFile) {
      // Validate file extension
      const allowedExtensions = ['xls', 'xlsx'];
      const extension:any = this.currentFile.name.split('.').pop()?.toLowerCase();
      console.log('extension', extension);
      
      if (!allowedExtensions.includes(extension)) {
        Swal.fire('Error', 'Formato de archivo invalido. Por favor seleccione un archivo con el formato .xls o .xlsx.', 'error');
        return; // Exit the function if extension is invalid
      }

      this.planillaService.upload(this.currentFile, this.planillaForm).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('Upload successful: ', event);
            Swal.fire('Bien', event.body.sms, 'success')
            this.closeDialog('created');
          }
        },
        (error: any) => {
          console.error('Error uploading file:', error);
          this.progress = 0;
          this.currentFile = undefined;

          // Handle errors (consider adding more specific error handling)
          // Swal.fire('Error', 'An error occurred during upload. Please try again later.', 'error');
          Swal.fire('Alerta', error.error.message, 'error')
        }
      );
    }
  }


}
