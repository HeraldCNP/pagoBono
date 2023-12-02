import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Planilla } from '../../interfaces/planilla';
import { PlanillaService } from '../../services/planilla.service';
import { FormPlanillaComponent } from './components/form-planilla/form-planilla.component';

@Component({
  selector: 'app-planillas',
  templateUrl: './planillas.component.html',
  styleUrls: ['./planillas.component.css']
})
export class PlanillasComponent {
  constructor(private matDialog: MatDialog) {

  }


  private planillaService = inject(PlanillaService)


  displayedColumn: string[] = ['_id', 'gestion', 'mes', 'acciones'];
  dataSource!: MatTableDataSource<Planilla>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  planillas = signal<any>(null);



  ngOnInit(): void {
    this.cargarPlanillas();
  }

  editBeneficiary(id: any) {
    this.openDialog(id, 'Editar Beneficiario')
  }

  createBeneficiary() {
    this.openDialog(0, 'Registrar Planilla')
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
        // this.planillaService.deleteBeneficiary(id)
        // .subscribe({
        //   next: () => {
        //     this.cargarBeneficiaries();
        //   },
        //   error: (message: string | undefined) => {
        //     Swal.fire('Error', message, 'error')
        //   }
        // })
        // Swal.fire({
        //   title: "¡Eliminado!",
        //   text: "Beneficiario ha sido eliminado.",
        //   icon: "success"
        // });
      }
    });

  }

  openDialog(id: any, title: any) {
    let dialog = this.matDialog.open(FormPlanillaComponent, {
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
          this.cargarPlanillas();
          Swal.fire('Bien', `Beneficiario Editado Correctamente`, 'success')
        }

        if(resp == 'created'){
          this.cargarPlanillas();
          Swal.fire('Bien', `Planilla Creada Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);

      }
    })
  }

  cargarPlanillas() {
    this.planillaService.getAllPlanillas()
      .subscribe({
        next: (data: any) => {
          this.planillas.set(data);
          console.log(this.planillas());
          this.dataSource = new MatTableDataSource(this.planillas());
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
