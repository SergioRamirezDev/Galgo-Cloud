import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription, Observable } from 'rxjs';
import { DragRef, CdkDragMove, CdkDrag, DropListRef } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit, OnDestroy {
  data: any = {
    folders: [{
      type: "folder",
      name: "Test",
      share: true,
      pos: { x: 10, y: 10 }
    },
    {
      type: "folder",
      name: "Test 2",
      share: false,
      pos: { x: 10, y: 10 }
    },
    {
      type: "folder",
      name: "Test 3",
      share: false,
      pos: { x: 10, y: 10 }
    }],
    files: [{
      type: "file",
      name: "file",
      share: false,
      pos: { x: 10, y: 10 }
    },
    {
      type: "file",
      name: "file 2",
      share: false,
      pos: { x: 10, y: 10 }
    },
    {
      type: "file",
      name: "file 3",
      share: false,
      pos: { x: 10, y: 10 }
    },
    {
      type: "file",
      name: "file 4",
      share: true,
      pos: { x: 10, y: 10 }
    }]
  }
  move: boolean = false
  subEvent: Subscription
  dropStartComponent: HTMLElement
  dropTouchComponent: HTMLElement
  dropLastComponent: HTMLElement
  constructor(public http: AppService) {
    this.subEvent = this.http.getForeignEvent().subscribe(res => {
      if (res.type = "create") {
        this.data.folders.push(res.data)
        //localStorage.setItem("data", JSON.stringify(this.data))
      }
    })
    /*let datos = localStorage.getItem("data")
    if (datos) {
      this.data = JSON.parse(datos)
    }*/
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

  log(ev: any) {
    //console.log(ev)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subEvent.unsubscribe()
  }

}
