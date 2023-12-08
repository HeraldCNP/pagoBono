import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';

@Component({
  selector: 'app-form-apoderado',
  templateUrl: './form-apoderado.component.html',
  styleUrls: ['./form-apoderado.component.css']
})
export class FormApoderadoComponent {
  private fb = inject(FormBuilder);
  private beneficiaryService = inject(BeneficiariesService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormApoderadoComponent>) {

  }

  departamentos: any[] = [
    { value: 'PT', label: 'Potosí' },
    { value: 'CH', label: 'Chuquisaca' },
  ];

  parentescos: any[] = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
  ];

  inputData: any;
  idBeneficiario:any;

  closeDialog(data: any) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.inputData = this.data;
    this.idBeneficiario = this.inputData.id;
    console.log(this.idBeneficiario);
  }

  public apoderadoForm: FormGroup = this.fb.group({
    nombres: ['', [Validators.required]],
    ci: ['', [Validators.required, Validators.minLength(7)]],
    expedido: [''],
    parentesco: [''],
    direccion: [''],
    celular: [''],
    idBeneficiario: [this.data.id],
  })

  get form() {
    return this.apoderadoForm.controls;
  }

  saveBeneficiary() {
    this.beneficiaryService.createBeneficiary(this.apoderadoForm.value).subscribe({
      next: (resp: any) => {
        this.closeDialog('created');
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }



}
