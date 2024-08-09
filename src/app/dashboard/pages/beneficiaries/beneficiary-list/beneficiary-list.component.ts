import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormBeneficiaryComponent } from '../components/form-beneficiary/form-beneficiary.component';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import { Beneficiary } from 'src/app/dashboard/interfaces/beneficiary';
import { FormApoderadoComponent } from '../components/form-apoderado/form-apoderado.component';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.css']
})
export class BeneficiaryListComponent {
  constructor(private matDialog: MatDialog) {

  }


  private beneficiaryService = inject(BeneficiariesService)


  displayedColumn: string[] = ['nombres', 'ci', 'sexo', 'fechaNacimiento', 'carnetFechaVencimiento', 'celular', 'direccion', 'tipoDiscapacidad', 'estado', 'observacion', 'acciones'];
  dataSource!: MatTableDataSource<Beneficiary>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  beneficiaries = signal<any>(null);



  ngOnInit(): void {
    this.cargarBeneficiaries();
  }

  createBeneficiary() {
    this.openDialog(0, 'Crear Beneficiario')
  }

  editBeneficiary(id: any) {
    this.openDialog(id, 'Editar Beneficiario')
  }

  addApoderado(id:string){
    this.openDialog2(id, 'Añadir Apoderado', null)
  }

  editApoderado(id:any, idApoderado: any){
    this.openDialog2(id, 'Editar Apoderado', idApoderado)
  }

  verApoderado(idApoderado: any) {
    this.openDialog2(null, 'Ver Apoderado', idApoderado)
  }

  deleteBeneficiary(id: any) {
    Swal.fire({
      title: "Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.beneficiaryService.deleteBeneficiary(id)
        .subscribe({
          next: () => {
            this.cargarBeneficiaries();
          },
          error: (message: string | undefined) => {
            Swal.fire('Error', message, 'error')
          }
        })
        Swal.fire({
          title: "¡Eliminado!",
          text: "Beneficiario ha sido eliminado.",
          icon: "success"
        });
      }
    });

  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormBeneficiaryComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
          this.cargarBeneficiaries();
          Swal.fire('Bien', `Beneficiario Editado Correctamente`, 'success')
        }

        if(resp == 'created'){
          this.cargarBeneficiaries();
          Swal.fire('Bien', `Beneficiario Creado Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
      }
    })
  }

  openDialog2(id: any, title: any, idApoderado:any) {
    let dialog = this.matDialog.open(FormApoderadoComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: id,
        title: title,
        idApoderado: idApoderado,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
          this.cargarBeneficiaries();
          Swal.fire('Bien', `Apoderado Editado Correctamente`, 'success')
        }

        if(resp == 'created'){
          this.cargarBeneficiaries();
          Swal.fire('Bien', `Apoderado Creado Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
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
