import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormBeneficiaryComponent } from '../components/form-beneficiary/form-beneficiary.component';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import { Beneficiary } from 'src/app/dashboard/interfaces/beneficiary';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.css']
})
export class BeneficiaryListComponent {
  constructor(private matDialog: MatDialog) {
  }


  private beneficiaryService = inject(BeneficiariesService)


  displayedColumn: string[] = ['_id', 'nombres', 'ci', 'sexo', 'fechaNacimiento', 'carnetFechaVencimiento', 'celular', 'direccion', 'tipoDiscapacidad', 'habilitado', 'acciones'];
  dataSource!: MatTableDataSource<Beneficiary>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  beneficiaries = signal<any>(null);



  ngOnInit(): void {
    this.cargarBeneficiaries()
  }

  openDialog() {
    let dialog = this.matDialog.open(FormBeneficiaryComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: 'Crear Beneficiario'
      }
    });
    dialog.afterClosed().subscribe(beneficiary => {
      console.log('user', beneficiary);
      if(beneficiary){
        this.cargarBeneficiaries();
        Swal.fire('Bien',`Usuario ${beneficiary.user.name} Creado Correctamente`, 'success')
      }
    })
  }

  cargarBeneficiaries() {
    this.beneficiaryService.getAllUsers()
      .subscribe({
        next: (data: any) => {
          this.beneficiaries.set(data);
          console.log(this.beneficiaries());
          this.dataSource = new MatTableDataSource(this.beneficiaries());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (message: string | undefined) => {
          Swal.fire('Error', message, 'error')

        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
