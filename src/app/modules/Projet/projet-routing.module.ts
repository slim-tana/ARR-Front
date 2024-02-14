import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetComponent } from './projet.component';
import { AddComponent } from './ProjetController/add/add.component';
import { GetComponent } from './ProjetController/get/get.component';
import { GetDetailsComponent } from './ProjetController/get-details/get-details.component';
import { GetParentComponent } from './ProjetController/get-parent/get-parent.component';
import { UpdateComponent } from './ProjetController/update/update.component';
import { CalendrierComponent} from './ProjetController/calendrier/calendrier.component';
import { StatisticsComponent} from './ProjetController/statistics/statistics.component';
import { DeleteComponent } from './ProjetController/delete/delete.component';



const routes: Routes = [
{path:'',redirectTo:'ProjetHome',pathMatch:'full'},
{ 
  path: 'ProjetHome', component: ProjetComponent,
  children:[

            {path:"add", component:AddComponent},
          
            {path:"detail/:id", component:GetDetailsComponent},

            {path:'update/:id', component:UpdateComponent},
            {path:'delete/:id', component:DeleteComponent},
            {path:"get", component:GetComponent},
            {path:"getParent", component:GetParentComponent},

            {path:"calendrier", component:CalendrierComponent},

            {path:"statistic", component:StatisticsComponent},

         
            ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
