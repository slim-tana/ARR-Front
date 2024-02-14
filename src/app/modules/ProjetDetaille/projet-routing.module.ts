import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetComponent } from './projet.component';

import { GetComponent } from './ProjetController/get/get.component';



const routes: Routes = [
{path:'',redirectTo:'ProjetHome',pathMatch:'full'},
{ 
  path: 'ProjetHome', component: ProjetComponent,
  children:[

            {path:"getProjetdet", component:GetComponent},
    

            ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
