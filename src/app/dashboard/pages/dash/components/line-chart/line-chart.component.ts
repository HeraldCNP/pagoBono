import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { groupBy, map, Observable, of, reduce } from 'rxjs';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import { PlanillaService } from 'src/app/dashboard/services/planilla.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit {
  public chart: Chart | undefined;
  private beneficiaryService = inject(BeneficiariesService)
  private planillaService = inject(PlanillaService)

  beneficiaries = signal<any>(null);
  planillas = signal<any>(null);
  conteoDiscapacidades = signal<any>(null);
  datos: any;
  nombresDiscapacidades: string[] = [];
  cantidadesDiscapacidades: number[] = [];

  meses: string[] = [];
  cantidadHabilitados: number[] = [];
  cantidadPagado: number[] = [];

  data: any[] = [];


  ngOnInit(): void {
    this.cargarPlanillas();
    // this.cargarBeneficiaries();
  }
  
  cargarPlanillas(params?: any) {
    
    this.planillaService.getAllPlanillas(params)
      .subscribe({
        next: (data: any) => {
          this.planillas.set(data);
          console.log(this.planillas());
          this.data = this.planillas();

          const groupedData = new Map<string, { habilitados: number, totalPagado: number }>();
          this.data.forEach(item => {
            console.log(item);
            
            if (!groupedData.has(item.mes)) {
              groupedData.set(item.mes, { habilitados: 0, totalPagado: 0 });
            }
            groupedData.get(item.mes)!.habilitados += item.Habilitados.length;
            groupedData.get(item.mes)!.totalPagado += item.totalPagado/250;
          });
      
          groupedData.forEach((value, key) => {
            this.meses.push(key);
            this.cantidadHabilitados.push(value.habilitados);
            this.cantidadPagado.push(value.totalPagado);
          });

          console.log(this.meses, this.cantidadHabilitados, this.cantidadPagado);
          this.renderChart(this.meses, this.cantidadHabilitados, this.cantidadPagado);
        },
        error: (message: any | undefined) => {
          // console.log(message);

          Swal.fire('Error', message, 'error')

        }
      })
  }

  cargarBeneficiaries() {
    this.beneficiaryService.getAllUsers()
      .subscribe({
        next: (data: any) => {
          this.beneficiaries.set(data);
          // console.log(this.beneficiaries());
          this.datos = this.disabilityCounts();
          if (this.datos != null) {
            // this.datos.map((value: any) => {
            //   this.nombresDiscapacidades.push(value.key);
            //   this.cantidadesDiscapacidades.push(value.value);
            // })

            for (let propiedad in this.datos) {
              // Agregar el nombre de la discapacidad al arreglo de nombres
              this.nombresDiscapacidades.push(propiedad);
              // Agregar la cantidad correspondiente al arreglo de cantidades
              this.cantidadesDiscapacidades.push(this.datos[propiedad]);
            }

            this.renderChart(this.nombresDiscapacidades, this.cantidadesDiscapacidades, this.cantidadesDiscapacidades);
          }



        },
        error: (message: string | undefined) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }

  renderChart(labels: any, data: any , data2?: any) {
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          // {
          //   label: 'My First Dataset',
          //   data: data,
          //   borderColor: 'rgb(75, 192, 192)',
          // }

          {
            label: 'Habilitados',
            data: data,
            borderColor: '#000000',
            backgroundColor: '#FFA500',
            hoverBorderWidth: 2,
            hoverBorderColor: '000000',
          },
          {
            label: 'Pagados',
            data: data2,
            borderColor: '#000000',
            backgroundColor: '#008000',
            hoverBorderWidth: 2,
            hoverBorderColor: '000000',
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Detalle por Meses'
          }
        }
      }
    })
  }

  disabilityCounts = computed(() => {
    return this.beneficiaries().reduce((acc: any, beneficiary: any) => {
      const tipoDiscapacidad = beneficiary.tipoDiscapacidad ?? 'Sin tipo';
      acc[tipoDiscapacidad] = (acc[tipoDiscapacidad] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });



  // newChartLine() {
  //   const labels: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  //   const data = {
  //     labels: labels,
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [65, 59, 80, 81, 56, 55, 40, 34, 54, 34, 56, 48],
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //       tension: 0.1
  //     }]
  //   };

  //   this.chart = new Chart("chart", {
  //     type: 'line' as ChartType,
  //     data
  //   });
  // }





}
