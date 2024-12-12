import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectYearComponent } from 'src/app/components/select-year/select-year.component';
import { Planilla } from 'src/app/dashboard/interfaces/planilla';
import { ReportService } from 'src/app/dashboard/services/report.service';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-report-two',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, SelectYearComponent, CommonModule],
  templateUrl: './report-two.component.html',
  styleUrl: './report-two.component.css'
})
export class ReportTwoComponent {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private _snackBar = inject(MatSnackBar)
  private router = inject(Router);

  searchForm: any;
  persona: any;
  flag: string = 'PENDIENTE';
  flag2: string = 'PENDIENTE';

  displayedColumn: string[] = ['gestion', 'mes', 'habilitados', 'pagados', 'porPagar', 'monto', 'cancelado', 'saldo', '%', 'acciones'];
  dataSource!: MatTableDataSource<Planilla>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  planillas = signal<any>(null);


  constructor(private matDialog: MatDialog) {
    this.searchForm = this.fb.group({
      gestion: [''],
      mes: [''],
      estadoPago: [true],
    })
  }


  ngOnInit(): void {
    this.getPlanillas();
  }

  meses: any[] = [
    { value: 'Enero', label: 'Enero' },
    { value: 'Febrero', label: 'Febrero' },
    { value: 'Marzo', label: 'Marzo' },
    { value: 'Abril', label: 'Abril' },
    { value: 'Mayo', label: 'Mayo' },
    { value: 'Junio', label: 'Junio' },
    { value: 'Julio', label: 'Julio' },
    { value: 'Agosto', label: 'Agosto' },
    { value: 'Septiembre', label: 'Septiembre' },
    { value: 'Octubre', label: 'Octubre' },
    { value: 'Noviembre', label: 'Noviembre' },
    { value: 'Diciembre', label: 'Diciembre' },
  ];

  onCheckboxChange(event: MatCheckboxChange) {
    const isChecked = event.checked;

    // Perform your desired actions based on the checked state
    if (isChecked) {
      this.flag = 'PENDIENTE';
      this.searchForm.get('estadoPago').setValue(this.flag);
    } else {
      this.flag = 'PAGADO';
      this.searchForm.get('estadoPago').setValue(this.flag);
    }
  }


  onSearch(): void {
    // console.log(this.searchForm.value);
    // this.loadReport(this.searchForm.value);
  }

  // loadReport(params?: any): void {
  //   this.reportService.getReport(params).subscribe({
  //     next: (data: any) => {
  //       console.log('Proyectos', data);

  //     },
  //     error: (error: any) => {
  //       console.log(error.error.message);
  //       // this._snackBar.open(error.error.message, 'Cerrar', { duration: 3000 });
  //     }
  //   });
  // }

  getPlanillas(params?: any): void {
    // this.searchForm.get('ci').setValue(this.searchForm.get('ci').trim);
    this.reportService.getPlanillas(params).subscribe({
      next: (data: any) => {
        // console.log('Result', data);
        console.log(data);
        this.planillas.set(data);
        // this.persona = data.persona;
        this.dataSource = new MatTableDataSource(this.planillas());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.flag2 = params.estadoPago;
      },
      error: (error: any) => {
        console.log(error.error.message);
        this._snackBar.open(error.error.message, 'Cerrar', { duration: 3000 });
      }
    });
  }


  // addPago(idPersona: any, idPlanilla: any) {
  //   console.log('idPersona', idPersona);
  //   console.log('idPlanilla', idPlanilla);
  //   this.openDialog(idPersona, idPlanilla, 'Registrar Pago')
  // }


  // openDialog(idPersona: any, idPlanilla: any, title: any) {
  //   let dialog = this.matDialog.open(FormPagoComponent, {
  //     width: '600px',
  //     enterAnimationDuration: '500ms',
  //     exitAnimationDuration: '1000ms',
  //     data: {
  //       idPersona: idPersona,
  //       idPlanilla: idPlanilla,
  //       title: title,
  //     }
  //   });
  //   dialog.afterClosed().subscribe({
  //     next: (resp: any) => {
  //       if (resp == 'edited') {
  //         this.loadReport();
  //         Swal.fire('Bien', `Pago Editado Correctamente`, 'success')
  //       }

  //       if (resp == 'created') {
  //         let params1 = this.searchForm.value;
  //         this.loadReport(params1);
  //         Swal.fire('Bien', `Pago realizado con exito`, 'success')
  //       }
  //     },
  //     error: (resp: any) => {
  //       console.log(resp.error.message);

  //     }
  //   })
  // }

  // rellenarDatos(){
  //   this.router.navigate(['dashboard/beneficiaries']);
  // }

  imprimir(dataForm: any) {
    this.reportService.imprimir(dataForm).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

    }, error => {
      console.error('Error fetching PDF URL', error);
    });
  }

  imprimirEstado(dataForm: any) {

    this.reportService.imprimirEstado(dataForm).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

    }, error => {
      console.error('Error fetching PDF URL', error);
    });
  }

}
