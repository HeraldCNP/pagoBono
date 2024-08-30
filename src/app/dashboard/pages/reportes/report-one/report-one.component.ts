import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { SelectYearComponent } from 'src/app/components/select-year/select-year.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReportService } from '../../../services/report.service';
import { MatTableDataSource } from '@angular/material/table';
import { Planilla } from 'src/app/dashboard/interfaces/planilla';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  searchForm: any;
  flag: string = 'Habilitados';

  displayedColumn: string[] = ['gestion', 'mes', 'acciones'];
  dataSource!: MatTableDataSource<Planilla>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  planillas = signal<any>(null);


  constructor(private matDialog: MatDialog) {
    this.searchForm = this.fb.group({
      gestion: [''],
      ci: [''],
      estadoPago: [''],
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
        this.planillas.set(data.carpetas);
        console.log(data);
        this.dataSource = new MatTableDataSource(this.planillas());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error.error.message);
        // this._snackBar.open(error.error.message, 'Cerrar', { duration: 3000 });
      }
    });
  }

}
