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
  public user:any = computed(() => this.authService.currentUser());
  public sidebarItems:any;

  constructor() {
    console.log(this.user());

    switch(this.user().roles){
      case 'admin':
      this.sidebarItems = [
        { label: 'Inicio', icon: 'home', url: './' },
        { label: 'Usuarios', icon: 'group', url: './users' },
        { label: 'Tipos de Discapacidad', icon: 'accessible_forward', url: './tiposDiscapacidad' },
        { label: 'Beneficiarios', icon: 'diversity_3', url: './beneficiaries' },
        { label: 'Planillas', icon: 'format_indent_increase', url: './planillas' },
        { label: 'Pagar beneficiario', icon: 'paid', url: './pagar' },
        { label: 'Reportes', icon: 'picture_as_pdf', url: './reportes' },
      ] 
      break; 
      case 'presupuestos': this.sidebarItems = [  
        { label: 'Inicio', icon: 'home', url: './' },
        { label: 'Planillas', icon: 'format_indent_increase', url: './planillas' },
      ]  
      break;
      case 'caja': this.sidebarItems = [
        { label: 'Inicio', icon: 'home', url: './' },
        { label: 'Tipos de Discapacidad', icon: 'accessible_forward', url: './tiposDiscapacidad' },
        { label: 'Beneficiarios', icon: 'diversity_3', url: './beneficiaries' },
        { label: 'Planillas', icon: 'format_indent_increase', url: './planillas' },
        { label: 'Pagar beneficiario', icon: 'paid', url: './pagar' },
        { label: 'Reportes', icon: 'picture_as_pdf', url: './reportes' },
      ]
      break;
    }

    // if(this.user().roles === 'admin'){
    //   this.sidebarItems = [
    //     { label: 'Inicio', icon: 'home', url: './' },
    //     // { label: 'BD', icon: 'description', url: './db' },
    //     { label: 'Usuarios', icon: 'group', url: './users' },
    //     { label: 'Tipos de Discapacidad', icon: 'accessible_forward', url: './tiposDiscapacidad' },
    //     { label: 'Beneficiarios', icon: 'diversity_3', url: './beneficiaries' },
    //     { label: 'Planillas', icon: 'format_indent_increase', url: './planillas' },
    //     { label: 'Pagar beneficiario', icon: 'paid', url: './reportes' },

    //     // { label: 'listado', icon: 'label', url: './list' }
    //     // { label: 'listado', icon: 'label', url: './list' }
    //   ]
    // } else {
    //   this.sidebarItems = [
    //     { label: 'Tipos de Discapacidad', icon: 'accessible_forward', url: './tiposDiscapacidad' },
    //     { label: 'Beneficiarios', icon: 'diversity_3', url: './beneficiaries' },
    //     { label: 'Planillas', icon: 'format_indent_increase', url: './planillas' },
    //     { label: 'Pagar beneficiario', icon: 'paid', url: './reportes' },
    //     // { label: 'listado', icon: 'label', url: './list' }
    //     // { label: 'listado', icon: 'label', url: './list' }
    //   ]
    // }

  }









  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
