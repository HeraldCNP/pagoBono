import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { SelectYearComponent } from 'src/app/components/select-year/select-year.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReportService } from '../../../services/report.service';
import { MatTableDataSource } from '@angular/material/table';
import { Planilla } from 'src/app/dashboard/interfaces/planilla';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { FormPagoComponent } from '../../planillas/components/form-pago/form-pago.component';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-report-one',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, SelectYearComponent, CommonModule, MatPaginator, MatSort],
  templateUrl: './report-one.component.html',
  styleUrl: './report-one.component.css'
})
export class ReportOneComponent {

  private fb = inject(FormBuilder);
  private reportService = inject(ReportService);
  private _snackBar = inject(MatSnackBar)
  private router = inject(Router);

  searchForm: any;
  persona: any;
  flag: string = 'Habilitados';
  flag2: string = 'PENDIENTE';

  displayedColumn: string[] = ['gestion', 'mes', 'acciones'];
  dataSource!: MatTableDataSource<Planilla>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  planillas = signal<any>(null);


  constructor(private matDialog: MatDialog) {
    this.searchForm = this.fb.group({
      gestion: [''],
      ci: ['', Validators.required],
      estadoPago: ['PENDIENTE'],
      Habilitados: 'true',
      Inhabilitados: 'false',
    })
  }



  onCheckboxChange(event: MatCheckboxChange) {
    const isChecked = event.checked;

    // Perform your desired actions based on the checked state
    if (isChecked) {
      this.flag = 'Habilitados';
      this.searchForm.get('Habilitados').setValue('true');
      this.searchForm.get('Inhabilitados').setValue('false');
    } else {
      this.flag = 'Inabilitados';
      this.searchForm.get('Habilitados').setValue('false');
      this.searchForm.get('Inhabilitados').setValue('true');
    }
  }


  onSearch(): void {
    // console.log(this.searchForm.value);
    this.loadReport(this.searchForm.value);
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

  loadReport(params?: any): void{
    // this.searchForm.get('ci').setValue(this.searchForm.get('ci').trim);
    this.reportService.getReport(params).subscribe({
      next: (data: any) => {
        // console.log('Result', data);
        this.planillas.set(data.planillas);
        this.persona = data.persona;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.planillas());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.flag2 = params.estadoPago;
      },
      error: (error: any) => {
        console.log(error.error.message);
        this._snackBar.open(error.error.message, 'Cerrar', { duration: 3000 });
      }
    });
  }


  addPago(idPersona: any, idPlanilla: any) {
    console.log('idPersona', idPersona);
    console.log('idPlanilla', idPlanilla);
    this.openDialog(idPersona, idPlanilla, 'Registrar Pago')
  }


  openDialog(idPersona: any, idPlanilla: any, title: any) {
    let dialog = this.matDialog.open(FormPagoComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        idPersona: idPersona,
        idPlanilla: idPlanilla,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
          this.loadReport();
          Swal.fire('Bien', `Pago Editado Correctamente`, 'success')
        }

        if (resp == 'created') {
          let params1 = this.searchForm.value;
          this.loadReport(params1);
          Swal.fire('Bien', `Pago realizado con exito`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);

      }
    })
  }

  rellenarDatos(){
    this.router.navigate(['dashboard/beneficiaries']);
  }

  generateBoleta(ci:any){
    
    this.reportService.generateBoleta(ci).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
    }, error => {
      console.error('Error fetching PDF URL', error);
    });
  }

}
