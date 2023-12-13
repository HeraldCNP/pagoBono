import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';

@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.css']
})
export class FormTipoComponent {
  private fb = inject(FormBuilder);
  private beneficiaryService = inject(BeneficiariesService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormTipoComponent>) {

  }

  editData: any;

  inputData: any;


  closeDialog(data: any) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.id != 0){
      this.loadTipoForId(this.inputData.id);
    }
  }

  public tipoForm: FormGroup = this.fb.group({
    tipo: ['', [Validators.required]],
  })

  get form() {
    return this.tipoForm.controls;
  }

  loadTipoForId(id: any) {
    this.beneficiaryService.getTipoById(id).subscribe(item => {
      this.editData = item;
      this.tipoForm.patchValue({
        tipo: this.editData.tipo,
      });
    })
  }

  saveTipo() {
    this.beneficiaryService.createTipo(this.tipoForm.value).subscribe({
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

  editTipo(id:any){
    this.beneficiaryService.editTipo(this.tipoForm.value, id).subscribe({
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
