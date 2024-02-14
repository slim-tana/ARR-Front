import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificationComponent } from './specification.component';

import { GetComponent } from './SpecificationController/get/get.component';



const routes: Routes = [
{path:'',redirectTo:'SpecificationHome',pathMatch:'full'},
{ 
  path: 'SpecificationHome', component: SpecificationComponent,
  children:[

            {path:"getSDD/:id", component:GetComponent},
    

            ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificationRoutingModule { }
