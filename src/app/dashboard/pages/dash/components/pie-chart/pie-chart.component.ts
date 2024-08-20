import { Component, computed, inject, Input, signal, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, ChartConfiguration, ChartData } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { BaseChartDirective } from 'ng2-charts';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import { MaterialModule } from 'src/app/material/material.module';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, MaterialModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  private beneficiaryService = inject(BeneficiariesService)
  beneficiaries = signal<any>(null);
  conteoDiscapacidades = signal<any>(null);
  datos: any;
  nombresDiscapacidades: string[] = [];
  cantidadesDiscapacidades: number[] = [];


  ngOnInit(): void {
    this.cargarBeneficiaries();
    
  }


  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.nombresDiscapacidades,
    datasets: [
      {
        data: this.cantidadesDiscapacidades,
      },
    ],
  };
  public pieChartType: ChartType = 'pie';


  cargarBeneficiaries() {
    this.beneficiaryService.getAllUsers()
      .subscribe({
        next: (data: any) => {
          this.beneficiaries.set(data);
          console.log(this.beneficiaries());
          this.datos = this.disabilityCounts();

          for (let propiedad in this.datos) {
            // Agregar el nombre de la discapacidad al arreglo de nombres
            this.nombresDiscapacidades.push(propiedad);
            // Agregar la cantidad correspondiente al arreglo de cantidades
            this.cantidadesDiscapacidades.push(this.datos[propiedad]);
          }
        },
        error: (message: string | undefined) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }

  // contarTiposDeDiscapacidad(beneficiarios: { tipoDiscapacidad: string }[]): { [key: string]: number } {
  //   return beneficiarios.reduce((acc, curr) => {
  //     const tipo = curr?.tipoDiscapacidad;
  //     if (acc[tipo]) {
  //       acc[tipo]++;
  //     } else {
  //       acc[tipo] = 1;
  //     }
  //     return acc;
  //   }, {} as { [key: string]: number });
  // }

  disabilityCounts = computed(() => {
    return this.beneficiaries().reduce((acc: any, beneficiary: any) => {
      const tipoDiscapacidad = beneficiary.tipoDiscapacidad ?? 'Sin tipo';
      acc[tipoDiscapacidad] = (acc[tipoDiscapacidad] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });

}
