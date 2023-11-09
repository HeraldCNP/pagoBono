import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService)
  private router = inject(Router)
  public user = computed(() => this.authService.currentUser());

  constructor() {
    console.log(this.user()?.email);
  }


  public sidebarItems = [
    { label: 'Usuarios', icon: 'label', url: './users' },
    { label: 'Beneficiarios', icon: 'label', url: './beneficiaries' },

    // { label: 'listado', icon: 'label', url: './list' }
    // { label: 'listado', icon: 'label', url: './list' }
  ]

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
