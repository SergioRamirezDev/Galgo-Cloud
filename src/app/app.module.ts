import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HomeComponent, UploadFileDialog } from './home/home.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { CompartidosComponent } from './compartidos/compartidos.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { EliminadosComponent } from './eliminados/eliminados.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrincipalComponent } from './principal/principal.component';
import { AuthGuard } from './app.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { AppService } from './app.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArchivosComponent,
    CompartidosComponent,
    SolicitudesComponent,
    EliminadosComponent,
    UsuariosComponent,
    LoginComponent,
    ForgetComponent,
    NotFoundComponent,
    PrincipalComponent,
    ConfiguracionComponent,
    AyudaComponent,
    UploadFileDialog
  ],
  entryComponents: [
    UploadFileDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgMatSearchBarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatDialogModule,
    FileUploadModule
  ],
  providers: [AuthGuard, AppService, { provide: LocationStrategy, useClass: HashLocationStrategy }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
