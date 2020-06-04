import { Component, OnInit, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { environment } from 'src/environments/environment';
import { AppService } from '../app.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface UsersElement {
  id: string;
  username: number;
  firstname: number;
  lastname: string;
  email: string;
  position: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'email', 'position', 'editar'];
  dataSource = new MatTableDataSource();
  loading: boolean = false
  constructor(public http: AppService, private apollo: Apollo, public dialog: MatDialog) { }

  getUsers() {
    this.loading = true
    this.apollo.query({
      query: environment.users,
      errorPolicy: "all"
    }).subscribe((helper: any) => {
      this.loading = false
      if (helper.errors) {
        helper.errors.map(error => {
          this.http.presentToast(error.message)
        })
      } else if (helper.data) {
        this.dataSource.data = helper.data.users
        console.log("Users", helper.data.users)
      }
    }, error => {
      this.http.presentToast(error)
      this.loading = false
    })
  }

  addUsers(data: any) {
    this.loading = true
    this.apollo.query({
      query: environment.addUser,
      errorPolicy: "all",
      variables: data,
    }).subscribe((helper: any) => {
      this.loading = false
      if (helper.errors) {
        helper.errors.map(error => {
          this.http.presentToast(error.message)
        })
      } else if (helper.data) {
        this.dataSource.data.push(helper.data.addUser)
        this.dataSource.data = this.dataSource.data
      }
    }, error => {
      this.http.presentToast(error)
      this.loading = false
    })
  }

  updateUsers(data: any) {
    this.loading = true
    this.apollo.query({
      query: environment.updateUser,
      errorPolicy: "all",
      variables: data,
    }).subscribe((helper: any) => {
      this.loading = false
      if (helper.errors) {
        helper.errors.map(error => {
          this.http.presentToast(error.message)
        })
      } else if (helper.data) {
        this.dataSource.data[
          this.dataSource.data.findIndex((x: any) => x.id == helper.data.updateUser.id)
        ] = helper.data.updateUser;
        this.dataSource.data = this.dataSource.data
      }
    }, error => {
      this.http.presentToast(error)
      this.loading = false
    })
  }

  openDialog(data: any = {}): void {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateUsers(result)
        } else {
          console.log(result)
          this.addUsers(result)
        }
      }
    });
  }

  ngOnInit() {
    this.getUsers()
  }

}

@Component({
  selector: 'usuarios-dialog',
  templateUrl: 'edit-usuarios.component.html',
  styles: [
    `
    .form {
      width: 100%;
    }
    
    .full-width {
      width: 100%;
    }
    `
  ]
})
export class UserDialog implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  positions: any[] = []
  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public http: AppService, private apollo: Apollo) {
    this.form = fb.group({
      id: [data.id],
      username: data.id ? { value: data.username, disabled: true } : ["", Validators.required],
      firstname: [data.firstname],
      lastname: [data.lastname],
      password: data.id ? [data.password ? data.password : ""] : ["", Validators.required],
      email: [data.email],
      position_id: [data.position_id, Validators.required],
    })
  }

  getPositions() {
    this.loading = true
    this.apollo.query({
      query: environment.positions,
      errorPolicy: "all"
    }).subscribe((helper: any) => {
      this.loading = false
      if (helper.errors) {
        helper.errors.map(error => {
          this.http.presentToast(error.message)
        })
      } else if (helper.data) {
        this.positions = helper.data.positions;
      }
    }, error => {
      this.http.presentToast(error)
      this.loading = false
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getPositions()
  }

}