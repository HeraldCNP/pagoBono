import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { BeneficiaryListComponent } from './pages/beneficiaries/beneficiary-list/beneficiary-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'beneficiaries', component: BeneficiaryListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
