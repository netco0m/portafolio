import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { BrowserModule } from '@angular/platform-browser';


export const routes: Routes = [
  { path: '', component: HomeComponent }, // Redirige la raíz a "inicio"
  { path: 'inicio', component: HomeComponent },
  { path: 'sobre-mi', component: SobreMiComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'habilidades', component: HabilidadesComponent },
  { path: 'contacto', component: ContactoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
