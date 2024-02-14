import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnologieComponent } from './technologie.component';
import { GetComponent } from './TechnologieController/get/get.component';



const routes: Routes = [
{path:'',redirectTo:'TechnologieHome',pathMatch:'full'},
{ 
  path: 'TechnologieHome', component: TechnologieComponent,
  children:[
          
            {path:"get/:id", component:GetComponent},
    

            ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnologieRoutingModule { }
