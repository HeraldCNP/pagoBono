import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<FormUserComponent>) {

  }

  inputData: any;
  closeDialog(data:any) {
    this.ref.close(data);
  }


  ngOnInit(): void {
    this.inputData = this.data;
  }

  public userForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  get form() {
    return this.userForm.controls;
  }

  saveUser() {
    this.userService.createUser(this.userForm.value).subscribe({
      next: (resp:any) => {
        this.closeDialog(resp);
      },
      error: (resp:any) => {
        // console.log(resp.error.message);
        Swal.fire('Error', resp.error.message, 'error')
      }
    })
  }
}
