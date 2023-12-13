import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BeneficiaryListComponent } from './pages/beneficiaries/beneficiary-list/beneficiary-list.component';
import { FormBeneficiaryComponent } from './pages/beneficiaries/components/form-beneficiary/form-beneficiary.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { PlanillasComponent } from './pages/planillas/planillas.component';
import { FormPlanillaComponent } from './pages/planillas/components/form-planilla/form-planilla.component';
import { ListaPlanillaComponent } from './pages/planillas/lista/lista-planilla/lista-planilla.component';
import { FormPagoComponent } from './pages/planillas/components/form-pago/form-pago.component';
import { FormApoderadoComponent } from './pages/beneficiaries/components/form-apoderado/form-apoderado.component';
import { PrintReciboComponent } from './pages/planillas/components/print-recibo/print-recibo.component';
import { TiposDiscapacidadComponent } from './pages/tiposDiscapacidad/tipos-discapacidad/tipos-discapacidad.component';
import { FormTipoComponent } from './pages/tiposDiscapacidad/tipos-discapacidad/components/form-tipo/form-tipo.component';
import { PrintRecibo2Component } from './pages/planillas/components/print-recibo2/print-recibo2.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    UserListComponent,
    FormUserComponent,
    BeneficiaryListComponent,
    FormBeneficiaryComponent,
    FileUploadComponent,
    PlanillasComponent,
    FormPlanillaComponent,
    ListaPlanillaComponent,
    FormPagoComponent,
    FormApoderadoComponent,
    PrintReciboComponent,
    TiposDiscapacidadComponent,
    FormTipoComponent,
    PrintRecibo2Component
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
