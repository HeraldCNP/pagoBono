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


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    UserListComponent,
    FormUserComponent,
    BeneficiaryListComponent,
    FormBeneficiaryComponent,
    FileUploadComponent,
    PlanillasComponent,
    FormPlanillaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
