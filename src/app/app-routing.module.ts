import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './app.guard';
import { PrincipalComponent } from './principal/principal.component';
import { EliminadosComponent } from './eliminados/eliminados.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { CompartidosComponent } from './compartidos/compartidos.component';
import { ForgetComponent } from './forget/forget.component';

const routes: Routes = [
  {
    path: 'app', canActivate: [AuthGuard], component: HomeComponent, children: [
      { path: '', component: PrincipalComponent, pathMatch: 'full' },
      { path: 'archivos', component: ArchivosComponent },
      { path: 'archivos-eliminados', component: EliminadosComponent },
      { path: 'archivos-compartidos', component: CompartidosComponent },
      { path: 'solicitudes-de-archivos', component: SolicitudesComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'ayuda', component: AyudaComponent },
    ]
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'no-encontrada', component: NotFoundComponent },
  { path: 'recuperar-contrasena', component: ForgetComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
