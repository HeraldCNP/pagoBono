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


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    UserListComponent,
    FormUserComponent,
    BeneficiaryListComponent,
    FormBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
