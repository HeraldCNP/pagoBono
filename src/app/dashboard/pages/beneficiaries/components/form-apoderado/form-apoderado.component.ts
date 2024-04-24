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
    { value: 'BE', label: 'Beni' },
    { value: 'CH', label: 'Chuquisaca' },
    { value: 'Co', label: 'Cochabamba' },
    { value: 'LP', label: 'La Paz' },
    { value: 'OR', label: 'Oruro' },
    { value: 'PA', label: 'Pando' },
    { value: 'PT', label: 'Potosí' },
    { value: 'SC', label: 'Santa Cruz' },
    { value: 'TJ', label: 'Tarija' },
  ];

  parentescos: any[] = [
    { value: 'Padre', label: 'Padre' },
    { value: 'Madre', label: 'Madre' },
    { value: 'Hermano(a)', label: 'Hermano(a)' },
    { value: 'Abuelo(a)', label: 'Abuelo(a)' },
    { value: 'Nieto(a)', label: 'Nieto(a)' },
    { value: 'Tio(a)', label: 'Tio(a)' },
    { value: 'Sobrino(a)', label: 'Sobrino(a)' },
    { value: 'Yerno(a)', label: 'Yerno(a)' },
    { value: 'Suegro(a)', label: 'Suegro(a)' },
    { value: 'Cuñado(a)', label: 'Cuñado(a)' },
    { value: 'Cónyuge', label: 'Cónyuge' },
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
    celular: [0],
    idPersona: [this.data.id],
  })

  get form() {
    return this.apoderadoForm.controls;
  }

  saveApoderado() {
    this.beneficiaryService.createApoderado(this.apoderadoForm.value).subscribe({
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
