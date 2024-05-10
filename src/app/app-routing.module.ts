import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'citas', component: CitasComponent},
  {path: 'consulta', component: ConsultasComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: "ignore",
    anchorScrolling:'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
