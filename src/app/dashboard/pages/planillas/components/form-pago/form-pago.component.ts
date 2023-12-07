import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanillaService } from 'src/app/dashboard/services/planilla.service';

@Component({
  selector: 'app-form-pago',
  templateUrl: './form-pago.component.html',
  styleUrls: ['./form-pago.component.css']
})
export class FormPagoComponent {
  private fb = inject(FormBuilder);
  private planillaService = inject(PlanillaService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormPagoComponent>) {

  }

  inputData: any;

  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.idPlanilla && this.inputData.idPersona){
      console.log('idPlanilla', this.inputData.idPlanilla);
      console.log('idPersona', this.inputData.idPersona);
    }
  }

  public pagoForm: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    monto: [''],
    idPersona: [this.data.idPersona],
    idPlanilla: [this.data.idPlanilla],
  })

  registerPago(){
    this.planillaService.registerPago(this.pagoForm.value).subscribe({
      next: (resp: any) => {
        // this.closeDialog('created');
        console.log(resp);

      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

}
