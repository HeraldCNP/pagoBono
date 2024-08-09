import { Component, ViewChild, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Planilla } from '../../interfaces/planilla';
import { PlanillaService } from '../../services/planilla.service';
import { FormPlanillaComponent } from './components/form-planilla/form-planilla.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-planillas',
  templateUrl: './planillas.component.html',
  styleUrls: ['./planillas.component.css']
})
export class PlanillasComponent {

  public user:any = computed(() => this.authService.currentUser());
  constructor(private matDialog: MatDialog) {
    console.log(this.user()?.roles);

  }


  private planillaService = inject(PlanillaService);
  private authService = inject(AuthService)
  private router = inject(Router);

  displayedColumn: string[] = ['gestion', 'mes', 'acciones'];
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

  createNewPlanilla() {
    this.openDialog(0, 'Registrar Planilla')
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

        if(resp == 'error'){
          this.cargarPlanillas();
          Swal.fire('Mal', `Error al subir archivo`, 'error')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);

      }
    })
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
        error: (message: any | undefined) => {
          // console.log(message);

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

  showList(id:string){
    this.router.navigate(['dashboard/planillas/lista',  id ]);
  }
}
