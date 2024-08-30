import { Component, computed, inject, Input, signal, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
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
  coloresChart: string[] = [];


  paletaBase = [
    '#FF5733', // Naranja intenso
    '#8B008B', // Violeta oscuro
    '#008000', // Verde esmeralda
    '#FF8C00', // Naranja oscuro
    '#4B0082', // Indigo
    '#00FFFF', // Cian
    '#FF00FF', // Magenta
    '#008080', // Cian oscuro
    '#FF4500', // Rojo anaranjado
    '#228B22', // Verde bosque
    '#FFD700', // Dorado
    '#191970', // Azul medianoche
    '#BA55D3', // Rosa
    '#FFA500', // Naranja
    '#800080', // Púrpura
    '#00CED1', // Azul turquesa
    '#DA70D6', // Violeta
    '#808000', // Oliva
    '#4682B4', // Azul steelblue
    '#FF1493'  // Rosa chicle
  ];

  ngOnInit(): void {
    this.cargarBeneficiaries();
  }


  // Pie


  cargarBeneficiaries() {
    this.beneficiaryService.getAllUsers()
      .subscribe({
        next: (data: any) => {
          this.beneficiaries.set(data);
          console.log(this.beneficiaries());
          this.datos = this.disabilityCounts();
          const coloresUsados = new Set();
          for (let propiedad in this.datos) {
            // Agregar el nombre de la discapacidad al arreglo de nombres
            this.nombresDiscapacidades.push(propiedad);
            // Agregar la cantidad correspondiente al arreglo de cantidades
            this.cantidadesDiscapacidades.push(this.datos[propiedad]);
            let colorAleatorio;
            do {
              const indiceAleatorio = Math.floor(Math.random() * this.paletaBase.length);
              colorAleatorio = this.paletaBase[indiceAleatorio];
            } while (coloresUsados.has(colorAleatorio));
          
            // Agregar el color único al conjunto de colores usados y al arreglo de colores del gráfico
            coloresUsados.add(colorAleatorio);
            this.coloresChart.push(colorAleatorio);
          }
          this.renderChart(this.nombresDiscapacidades, this.cantidadesDiscapacidades);
        },
        error: (message: string | undefined) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }

  disabilityCounts = computed(() => {
    return this.beneficiaries().reduce((acc: any, beneficiary: any) => {
      const tipoDiscapacidad = beneficiary.tipoDiscapacidad ?? 'SIN TIPO';
      acc[tipoDiscapacidad] = (acc[tipoDiscapacidad] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });


  renderChart(labels: any, data: any) {

    const myChart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Tipos de Discapacidad',
            data: data,
            backgroundColor: this.coloresChart,
            borderColor: '#FFFFFF',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'left',
          },
          title: {
            display: true,
            text: 'Tipos de Discapacidad'
          }
        }
      }
    });
  }

}
