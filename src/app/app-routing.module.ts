import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotografiaComponent } from './components/fotografia/fotografia.component';
import { HomeComponent } from './components/home/home.component';
import { IlustracionesComponent } from './components/ilustraciones/ilustraciones.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ilustraciones', component: IlustracionesComponent },
  { path: 'fotografía', component: FotografiaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
