import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tipoDiscapacidad } from 'src/app/dashboard/interfaces/tipoDiscapacidad';
import { BeneficiariesService } from 'src/app/dashboard/services/beneficiaries.service';
import Swal from 'sweetalert2';
import { FormTipoComponent } from './components/form-tipo/form-tipo.component';

@Component({
  selector: 'app-tipos-discapacidad',
  templateUrl: './tipos-discapacidad.component.html',
  styleUrls: ['./tipos-discapacidad.component.css']
})
export class TiposDiscapacidadComponent {
  constructor(private matDialog: MatDialog) {

  }


  private beneficiaryService = inject(BeneficiariesService)

  displayedColumn: string[] = ['tipo', 'acciones'];
  dataSource!: MatTableDataSource<tipoDiscapacidad>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tipos = signal<any>(null);

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos() {
    this.beneficiaryService.getAllTipos()
      .subscribe({
        next: (data: any) => {
          this.tipos.set(data);
          console.log(this.tipos());
          this.dataSource = new MatTableDataSource(this.tipos());
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (message: string | undefined) => {
          Swal.fire('Error', message, 'error')
        }
      })
  }



  addTipo() {
    this.openDialog(0, 'Crear Tipo de Discapacidad')
  }

  editTipo(id: any) {
    this.openDialog(id, 'Editar Tipo de Discapacidad')
  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormTipoComponent, {
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
          this.cargarTipos();
          Swal.fire('Bien', `Tipo Editado Correctamente`, 'success')
        }

        if(resp == 'created'){
          this.cargarTipos();
          Swal.fire('Bien', `Tipo Creado Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);
        // Swal.fire('Error', resp, 'error')
        // Swal.fire('Error', resp, 'error')
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

  deleteTipo(id: any) {
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
        this.beneficiaryService.deleteTipo(id)
        .subscribe({
          next: () => {
            this.cargarTipos();
          },
          error: (message: string | undefined) => {
            Swal.fire('Error', message, 'error')
          }
        })
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tipo ha sido eliminado.",
          icon: "success"
        });
      }
    });

  }


}
