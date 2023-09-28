import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  public sidebarItems = [
    { label: 'listado', icon: 'label', url: './list' }
    // { label: 'listado', icon: 'label', url: './list' }
    // { label: 'listado', icon: 'label', url: './list' }
  ]
}
