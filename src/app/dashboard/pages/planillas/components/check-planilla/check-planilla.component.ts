import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanillaService } from 'src/app/dashboard/services/planilla.service';
import { MaterialModule } from 'src/app/material/material.module';
import Swal from 'sweetalert2';
import { Planilla } from '../../../../interfaces/planilla';

@Component({
  selector: 'app-check-planilla',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './check-planilla.component.html',
  styleUrl: './check-planilla.component.css'
})
export class CheckPlanillaComponent {
  private fb = inject(FormBuilder);
  
  private planillaService = inject(PlanillaService);

  inputData: any;
  planillaForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<CheckPlanillaComponent>) {
    this.planillaForm = this.fb.group({
      preventivo: ['', [Validators.required]],
      estado: ['APROBADO', [Validators.required]],
    })
  }
   
  closeDialog(data: any) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.inputData = this.data;
    console.log(this.inputData);
    
  }

  get form() {
    return this.planillaForm.controls;
  }

  aprobarPlanilla(){

    this.planillaService.editPlanilla(this.planillaForm.value, this.inputData.planilla._id)
    .subscribe({
      next: (data: any) => {
        this.closeDialog('edited');
      },
      error: (message: string | undefined) => {
        Swal.fire('Error', message, 'error')
      }
    })
  }



}
