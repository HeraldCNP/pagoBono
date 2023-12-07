import { Component, inject, ViewChild, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Habilitado } from 'src/app/dashboard/interfaces/habilitado';
import { PlanillaService } from 'src/app/dashboard/services/planilla.service';
import Swal from 'sweetalert2';
import { FormPagoComponent } from '../../components/form-pago/form-pago.component';

@Component({
  selector: 'app-lista-planilla',
  templateUrl: './lista-planilla.component.html',
  styleUrls: ['./lista-planilla.component.css']
})
export class ListaPlanillaComponent {
  constructor(private matDialog: MatDialog) {

  }

  private planillaService = inject(PlanillaService);
  private route = inject(ActivatedRoute);

  idPlanilla: any;

  ngOnInit(): void {
    this.cargarHabilitados();
  }



  displayedColumn: string[] = ['_id', 'ci', 'nombres', 'estado', 'habilitado', 'acciones'];
  dataSource!: MatTableDataSource<Habilitado>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  habilitados = signal<any>(null);


  cargarHabilitados() {
    this.idPlanilla = this.route.snapshot.paramMap.get('id');

    this.planillaService.getPlanilla(this.idPlanilla)
      .subscribe({
        next: (data: any) => {
          this.habilitados.set(data);
          console.log(this.habilitados().idHabilitados);
          this.dataSource = new MatTableDataSource(this.habilitados().idHabilitados);
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


  addPago(idPersona:any){
    // console.log('idPersona', idPersona);
    // console.log('idPlanilla', this.idPlanilla);
    this.openDialog(idPersona, this.idPlanilla, 'Registrar Pago')
  }


  openDialog(idPersona: any, idPlanilla:any, title: any) {
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
          this.cargarHabilitados();
          Swal.fire('Bien', `Beneficiario Editado Correctamente`, 'success')
        }

        if(resp == 'created'){
          this.cargarHabilitados();
          Swal.fire('Bien', `Planilla Creada Correctamente`, 'success')
        }
      },
      error: (resp: any) => {
        console.log(resp.error.message);

      }
    })
  }



}
