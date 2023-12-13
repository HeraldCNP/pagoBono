import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import { PlanillaService } from 'src/app/dashboard/services/planilla.service';

@Component({
  selector: 'app-print-recibo2',
  templateUrl: './print-recibo2.component.html',
  styleUrls: ['./print-recibo2.component.css']
})
export class PrintRecibo2Component {
  private route = inject(ActivatedRoute);
  private planillaService = inject(PlanillaService);
  private beneficiaryService = inject(BeneficiariesService);

  idPlanilla:string = '';
  idBeneficiary:string = '';

  beneficiary: any;
  beneficiaryPagado: any;
  habilitados = signal<any>(null);
  planilla = signal<any>(null);

  constructor(){
    this.route.params.subscribe(params => {
      this.idPlanilla = params['idPlanilla'];
      this.idBeneficiary = params['idBeneficiary'];
    });

    this.getBeneficiary();
    this.getPlanilla();
  }

  getBeneficiary(){
    this.beneficiaryService.getBeneficiaryById(this.idBeneficiary).subscribe(item => {
      this.beneficiary = item;
      console.log('Beneficiario', this.beneficiary);
    })
  }

  getPlanilla(){
    this.planillaService.getPlanilla(this.idPlanilla)
    .subscribe({
      next: (data: any) => {
        this.habilitados.set(data);
        this.planilla.set(data);
        console.log('planilla', this.planilla());

        console.log(this.habilitados().Habilitados);
        this.beneficiaryPagado = this.sacarBeneficiario(this.idBeneficiary);
        console.log('Beneficiario Pagado', this.beneficiaryPagado);

      }
    })
  }

  sacarBeneficiario(idBene:any) {
    console.log(idBene);
    // Encontrar el objeto por el id
    let  encontrado;
    this.habilitados().Habilitados.forEach((b: { id: any; }) => {
      if(b.id === idBene) {
        encontrado = b;
      }
    });
    // // Guardarlo en variable separada
    // this.beneficiaryPagado = encontrado;
    return encontrado;
  }

  public printMe(): void {
    window.print();
  }
}
