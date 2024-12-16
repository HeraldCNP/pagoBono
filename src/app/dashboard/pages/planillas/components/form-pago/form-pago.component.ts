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

  isSubmitting = false;

  inputData: any;
  date: Date = new Date();

  ngOnInit(): void {
    this.inputData = this.data;
    if(this.inputData.idPlanilla && this.inputData.idPersona){
      console.log('idPlanilla', this.inputData.idPlanilla);
      console.log('idPersona', this.inputData.idPersona);
    }
  }

  get form() {
    return this.pagoForm.controls;
  }

  public pagoForm: FormGroup = this.fb.group({
    fecha: [this.date, [Validators.required]],
    monto: [250, [Validators.required]],
    idPersona: [this.data.idPersona],
    idPlanilla: [this.data.idPlanilla],
  })

  registerPago(){
    if (this.isSubmitting) {
      return; // Evita múltiples ejecuciones
    }

    this.isSubmitting = true; // Desactiva el botón

    this.planillaService.registerPago(this.pagoForm.value).subscribe({
      next: (resp: any) => {
        // this.closeDialog('created');
        console.log(resp);
        this.closeDialog('created');
        // this.isSubmitting = false; // Reactiva el botón tras el éxito
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // this.isSubmitting = false; // Reactiva el botón tras el éxito
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  closeDialog(data: any) {
    this.ref.close(data);
  }


}
