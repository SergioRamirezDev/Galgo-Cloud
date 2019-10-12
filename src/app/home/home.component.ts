import { Component, OnInit, Inject } from '@angular/core';
import { ArchivosComponent } from '../archivos/archivos.component';
import { AppService } from '../app.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Apollo } from 'apollo-angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photo: string
  alias: string
  loading: boolean = false
  form: FormGroup
  constructor(@Inject(FormBuilder) fb: FormBuilder, public http: AppService, public dialog: MatDialog, private authService: AuthService, private router: Router, private apollo: Apollo) {
    this.photo = localStorage.getItem("photo")
    this.alias = localStorage.getItem("username")
    this.form = fb.group({
      name: new FormControl({ value: '', disabled: false }, Validators.required),
      folder_id: new FormControl({ value: '', disabled: false }, Validators.required),
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl("/login")
  }

  crearFolder() {
    let name = prompt("Escribe el nombre del archivo")
    this.loading = true
    this.apollo.mutate({
      mutation: environment.createfolder,
      variables: {
        name: name,
        folder_id: localStorage.getItem("current_folder")
      },
      errorPolicy: "all"
    }).subscribe((helper: any) => {
      this.loading = false
      if (helper.errors) {
        helper.errors.map(error => {
          this.http.presentToast(error.message)
        })
      } else {
        this.http.presentToast("Carpeta Creada.")
        this.http.setForeignEvent("create", helper.data.createFolder)
      }
    }, error => {
      this.http.presentToast(error)
      this.loading = false
    })
  }

  openUploadFileDialog(): void {
    const dialogRef = this.dialog.open(UploadFileDialog, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  ngOnInit() {
  }


}

@Component({
  selector: 'upload-file',
  templateUrl: './upload.file.html',
  styles: [`
  .my-drop-zone {
    border: dotted 3px #7cbb74;
    height: 200px;
    display: flex;
    color:#989898;
    align-items: center; }
  .nv-file-over { border: dotted 3px red; }
  .another-file-over-class { border: dotted 3px green; }
  .spacer {
    flex: 1 1 auto;
  }
  `]
})
export class UploadFileDialog {
  public uploader: FileUploader = new FileUploader({ url: "" });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  constructor(
    public dialogRef: MatDialogRef<UploadFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
