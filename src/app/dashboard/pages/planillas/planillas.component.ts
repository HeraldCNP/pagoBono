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
import { CheckPlanillaComponent } from './components/check-planilla/check-planilla.component';

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


  displayedColumn: string[] = ['gestion', 'mes', 'preventivo', 'monto', 'pagado', 'saldo', 'acciones'];
  dataSource!: MatTableDataSource<Planilla>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  planillas = signal<any>(null);



  ngOnInit(): void {

    if(this.user()?.roles == 'caja'){
      let param = { estado : 'APROBADO' };
      this.cargarPlanillas(param);
    }else{
      this.cargarPlanillas();
    }
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

  deletePlanilla(id: any) {
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
        this.planillaService.deletePlanilla(id)
        .subscribe({
          next: () => {
            this.cargarPlanillas();
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

  aprobarPlanilla(idPlanilla: any) {
    this.openDialog2(idPlanilla, 'Aprobar Planilla');
  }

  openDialog2(planilla: any, title: any) {
    let dialog = this.matDialog.open(CheckPlanillaComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        planilla: planilla,
        title: title,
      }
    });
    dialog.afterClosed().subscribe({
      next: (resp: any) => {
        if (resp == 'edited') {
          this.cargarPlanillas();
          Swal.fire('Bien', `Planilla aprobada correctamente`, 'success')
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


  cargarPlanillas(params?: any) {
    
    this.planillaService.getAllPlanillas(params)
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

  getInfoPlanilla(id:any){
    this.planillaService.getInfoPlanilla(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      
    }, error => {
      console.error('Error fetching PDF URL', error);
    });
  }

  printPlanilla(id:any){
    this.planillaService.printPlanilla(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
    }, error => {
      console.error('Error fetching PDF URL', error);
    });
  }

}
