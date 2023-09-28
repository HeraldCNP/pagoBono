import { Component, inject, computed } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService)
  public user = computed(() => this.authService.currentUser());

  constructor() {
    console.log(this.user()?.email);
  }


  public sidebarItems = [
    { label: 'listado', icon: 'label', url: './list' },

    // { label: 'listado', icon: 'label', url: './list' }
    // { label: 'listado', icon: 'label', url: './list' }
  ]

  onLogout() {
    this.authService.logout();
  }
}
