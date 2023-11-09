import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-beneficiary',
  templateUrl: './form-beneficiary.component.html',
  styleUrls: ['./form-beneficiary.component.css']
})
export class FormBeneficiaryComponent {
  private fb = inject(FormBuilder);
  private beneficiaryService = inject(BeneficiariesService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormBeneficiaryComponent>) {

  }

  sexos: any[] = [
    {value: 'M', label: 'Masculino'},
    {value: 'F', label: 'Femenino'},
  ];

  discapacidades: any[] = [
    {value: 'M', label: 'Masculino'},
    {value: 'F', label: 'Femenino'},
  ];

  departamentos: any[] = [
    {value: 'PT', label: 'Potosí'},
    {value: 'CH', label: 'Chuquisaca'},
  ];

  inputData: any;
  closeDialog(data:any) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.inputData = this.data;
  }

  public beneficiaryForm: FormGroup = this.fb.group({
    nombres: ['', [Validators.required]],
    ci: ['', [Validators.required, Validators.minLength(7)]],
    expedido: [''],
    fechaNacimiento: [''],
    sexo: [''],
    carnetFechaVencimiento: [''],
    tipoDiscapacidad: [''],
    direccion: [''],
    celular: [''],
  })

  get form() {
    return this.beneficiaryForm.controls;
  }

  saveBeneficiary() {
    this.beneficiaryService.createBeneficiary(this.beneficiaryForm.value).subscribe({
      next: (resp:any) => {
        this.closeDialog(resp);
      },
      error: (resp:any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

}
