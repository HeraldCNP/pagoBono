import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces';
import { UserService } from 'src/app/dashboard/services/user.service';
import Swal from 'sweetalert2';
import { FormUserComponent } from 'src/app/dashboard/components/form-user/form-user.component';

export interface UserData {
  id: string;
  user: string;
  email: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  constructor(private matDialog: MatDialog) {
  }


  private userService = inject(UserService)


  displayedColumn: string[] = ['_id', 'name', 'email', 'acciones'];
  dataSource!: MatTableDataSource<User>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users = signal<any>(null);



  ngOnInit(): void {
    this.cargarUsers()
  }

  openDialog() {
    let dialog = this.matDialog.open(FormUserComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: 'Crear Usuario'
      }
    });
    dialog.afterClosed().subscribe(user => {
      console.log('user', user);
      if(user){
        this.cargarUsers();
        Swal.fire('Bien',`Usuario ${user.user.name} Creado Correctamente`, 'success')
      }
    })
  }

  cargarUsers() {
    this.userService.getAllUsers()
      .subscribe({
        next: (data: any) => {
          this.users.set(data);
          console.log(this.users());
          this.dataSource = new MatTableDataSource(this.users());
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
}
