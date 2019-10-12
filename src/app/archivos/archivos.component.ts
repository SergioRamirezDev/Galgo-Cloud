import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription, Observable } from 'rxjs';
import { DragRef, CdkDragMove, CdkDrag, DropListRef } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit, OnDestroy {
  data: any = {}
  move: boolean = false
  subEvent: Subscription
  dropStartComponent: HTMLElement
  dropTouchComponent: HTMLElement
  dropLastComponent: HTMLElement
  root: any = {}
  loading: boolean = false
  constructor(public http: AppService, private apollo: Apollo) {
    let root = localStorage.getItem("root");
    if (root) { this.root = JSON.parse(root) }
    this.subEvent = this.http.getForeignEvent().subscribe(res => {
      if (res.type = "create") {
        this.data.folders.push(res.data)
      }
    })
  }

  onStart(event: CdkDrag) {
    this.dropStartComponent = event.element.nativeElement
    this.dropStartComponent.style.opacity = "0.9"
  }

  onMove(event: CdkDragMove) {
    let ondrop: any = event.event.composedPath().filter((x: HTMLElement) => x.nodeName == "MAT-CARD");
    if (this.dropTouchComponent) {
      this.dropTouchComponent.style.background = "transparent"
      this.dropTouchComponent.style.border = "2px solid transparent"
    }
    if (ondrop.length > 0 && event.source.element.nativeElement.id != ondrop[0].id && ondrop[0].id.indexOf("folder") != -1) {
      this.dropTouchComponent = ondrop[0].parentElement
      this.dropTouchComponent.style.background = "#d1e6ed"
      this.dropTouchComponent.style.border = "2px solid #44c4be"
    }
  }

  onDrag(event: CdkDrag) {
    this.move = false;
    this.dropStartComponent.style.transform = "translate3d(0px, 0px, 0px)";
    this.dropStartComponent.style.opacity = "1"
    event._dragRef.reset()
    if (event.element.nativeElement) {
      this.dropTouchComponent.style.background = "transparent"
      this.dropTouchComponent.style.border = "2px solid transparent"
    }
  }

  getFolderFiles(root: string = this.root.id) {
    this.root.id = root
    localStorage.setItem("current_folder",this.root.id)
    console.log("Root",this.root.id)
    this.loading = true
    this.apollo.query({
      query: environment.datainfolder,
      variables: {
        folder_id: root
      },
      errorPolicy: "all"
    }).subscribe((helper: any) => {
      this.loading = false
      if (helper.errors) {
        helper.errors.map(error => {
          this.http.presentToast(error.message)
        })
      } else if (helper.data.dataInFolder) {
        this.data = helper.data.dataInFolder
      }
    }, error => {
      this.http.presentToast(error)
      this.loading = false
    })
  }

  log(ev: any) {
    //console.log(ev)
  }

  ngOnInit() {
    this.getFolderFiles()
  }

  ngOnDestroy() {
    this.subEvent.unsubscribe()
  }

}
