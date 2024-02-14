import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControleComponent } from './controle.component';

import { GetComponent } from './ControleController/get/get.component';



const routes: Routes = [
{path:'',redirectTo:'ControleHome',pathMatch:'full'},
{ 
  path: 'ControleHome', component: ControleComponent,
  children:[

            {path:"getVeracode/:id", component:GetComponent},
    

            ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControleRoutingModule { }
