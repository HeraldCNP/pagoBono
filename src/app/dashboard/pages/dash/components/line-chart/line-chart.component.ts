import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
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
  beneficiaries = signal<any>(null);
  conteoDiscapacidades = signal<any>(null);
  datos: any;
  nombresDiscapacidades: string[] = [];
  cantidadesDiscapacidades: number[] = [];


  ngOnInit(): void {
    this.cargarBeneficiaries();
  }


  cargarBeneficiaries() {
    this.beneficiaryService.getAllUsers()
      .subscribe({
        next: (data: any) => {
          this.beneficiaries.set(data);
          console.log(this.beneficiaries());
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

            this.renderChart(this.nombresDiscapacidades, this.cantidadesDiscapacidades);
          }



        },
        error: (message: string | undefined) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }

  renderChart(labels: any, data: any) {
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
            borderColor: '#ffcd56',
            backgroundColor: '#ffcd56',
            hoverBorderWidth: 5,
            hoverBorderColor: 'green',
          },
          {
            label: 'Pagados',
            data: data,
            borderColor: '#20b2aa',
            backgroundColor: '#20b2aa',
            hoverBorderWidth: 5,
            hoverBorderColor: 'green',
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
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
