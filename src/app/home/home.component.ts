import { Component, OnInit, Inject } from '@angular/core';
import { ArchivosComponent } from '../archivos/archivos.component';
import { AppService } from '../app.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carpeta: ArchivosComponent
  constructor(public http: AppService, public dialog: MatDialog) { }

  crearFolder() {
    let data = {}
    let a = prompt("Escribe el nombre del archivo");
    data = { type: "folder", name: a, share: false }
    this.http.setForeignEvent("create", data)
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
  public uploader:FileUploader = new FileUploader({url: ""});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  constructor(
    public dialogRef: MatDialogRef<UploadFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
