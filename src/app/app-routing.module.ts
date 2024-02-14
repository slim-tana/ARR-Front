import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import {AddComponent} from '../app/modules/user/UserController/add/add.component';



const routes: Routes = [
 
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirection vers la page souhaitée
  { path:"auth", component:AddComponent},
  { path: 'Technologie', loadChildren: () => import('./modules/technologies/technologie.module').then(m => m.TechnologieModule) },
  { path: 'Specification', loadChildren: () => import('./modules/SpecificationHLD/specification.module').then(m => m.SpecificationModule) },
  { path: 'Specification', loadChildren: () => import('./modules/SpecificationSDD/specification.module').then(m => m.SpecificationModule) },
  { path: 'Controle', loadChildren: () => import('./modules/ControlePentest/controle.module').then(m => m.ControleModule) },
  { path: 'Controle', loadChildren: () => import('./modules/ControleVeraCode/controle.module').then(m => m.ControleModule) },
  { path: 'Projet', loadChildren: () => import('./modules/ProjetDetaille/projet.module').then(m => m.ProjetModule) },
  { path: 'Projet', loadChildren: () => import('./modules/Projet/projet.module').then(m => m.ProjetModule) },
  { path: 'User', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },

  {path:'**',component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
