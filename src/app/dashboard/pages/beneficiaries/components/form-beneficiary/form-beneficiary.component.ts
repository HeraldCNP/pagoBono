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
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
  ];

  discapacidades: any[] = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
  ];

  departamentos: any[] = [
    { value: 'PT', label: 'Potosí' },
    { value: 'CH', label: 'Chuquisaca' },
  ];

  editData: any;

  inputData: any;

  closeDialog(data: any) {
    this.ref.close(data);
  }



  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.id != 0){
      this.loadBeneficiaryForId(this.inputData.id);
    }
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


  loadBeneficiaryForId(id: any) {
    this.beneficiaryService.getBeneficiaryById(id).subscribe(item => {
      this.editData = item;
      this.beneficiaryForm.patchValue({
        nombres: this.editData.nombres,
        ci: this.editData.ci,
        expedido: this.editData.expedido,
        fechaNacimiento: this.editData.fechaNacimiento,
        sexo: this.editData.sexo,
        carnetFechaVencimiento: this.editData.carnetFechaVencimiento,
        tipoDiscapacidad: this.editData.tipoDiscapacidad,
        direccion: this.editData.direccion,
        celular: this.editData.celular,
      });
    })
  }

  saveBeneficiary() {
    this.beneficiaryService.createBeneficiary(this.beneficiaryForm.value).subscribe({
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

  editBeneficiary(id:any){
    this.beneficiaryService.editBeneficiary(this.beneficiaryForm.value, id).subscribe({
      next: (resp: any) => {
        this.closeDialog('edited');
        // console.log("resp",resp);
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }





}
