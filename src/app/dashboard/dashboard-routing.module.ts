import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { BeneficiaryListComponent } from './pages/beneficiaries/beneficiary-list/beneficiary-list.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { PlanillasComponent } from './pages/planillas/planillas.component';
import { ListaPlanillaComponent } from './pages/planillas/lista/lista-planilla/lista-planilla.component';
import { TiposDiscapacidadComponent } from './pages/tiposDiscapacidad/tipos-discapacidad/tipos-discapacidad.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'beneficiaries', component: BeneficiaryListComponent },
      { path: 'db', component: FileUploadComponent },
      { path: 'planillas', component: PlanillasComponent },
      { path: 'planillas/lista/:id', component: ListaPlanillaComponent },
      { path: 'tiposDiscapacidad', component: TiposDiscapacidadComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
