import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import { PlanillaService } from 'src/app/dashboard/services/planilla.service';


@Component({
  selector: 'app-print-recibo',
  templateUrl: './print-recibo.component.html',
  styleUrls: ['./print-recibo.component.css']
})
export class PrintReciboComponent {
  private fb = inject(FormBuilder);
  private planillaService = inject(PlanillaService);
  private beneficiaryService = inject(BeneficiariesService);
  private authService = inject(AuthService);

  idUser: any;
  user: any;
  dataUser: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PrintReciboComponent>) {
    this.user = localStorage.getItem('user');
    this.dataUser = this.authService.currentUser();
    this.idUser = this.data.id;
  }


  inputData: any;
  habilitados = signal<any>(null);
  planilla = signal<any>(null);
  beneficiaryPagado = signal<any>(null);
  beneficiary = signal<any>(null);
  date = new Date();

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.idPlanilla && this.inputData.idPersona) {
      console.log('idPlanilla', this.inputData.idPlanilla);
      console.log('idPersona', this.inputData.idPersona);
    }
    this.getBeneficiary();
    this.getPlanilla();
  }

  getBeneficiary() {
    this.beneficiaryService.getBeneficiaryById(this.inputData.idPersona).subscribe(item => {
      this.beneficiary.set(item);
      console.log('Beneficiario', this.beneficiary());
    })
  }

  getPlanilla() {
    this.planillaService.getPlanilla(this.inputData.idPlanilla)
      .subscribe({
        next: (data: any) => {
          this.habilitados.set(data);
          this.planilla.set(data);
          console.log('planilla', this.planilla());

          // console.log(this.habilitados().Habilitados);
          this.beneficiaryPagado.set(this.sacarBeneficiario(this.inputData.idPersona));
          console.log('Beneficiario Pagado', this.beneficiaryPagado());

        }
      })
  }

  sacarBeneficiario(idBene: any) {
    console.log(idBene);
    // Encontrar el objeto por el id
    let encontrado;
    this.habilitados().Habilitados.forEach((b: { id: any; }) => {
      if (b.id === idBene) {
        encontrado = b;
      }
    });
    // // Guardarlo en variable separada
    // this.beneficiaryPagado = encontrado;
    return encontrado;
  }

  // public printMe(): void {
  //   window.print();
  // }


  calcularEdad(fecha: Date): number {
    const hoy = new Date();
    let fechaNacimiento: Date = new Date(fecha);


    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const meses = hoy.getMonth() - fechaNacimiento.getMonth();

    if (meses < 0 || (meses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

}
