import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { GetComponent } from './UserController/get/get.component';
import {AddComponent} from './UserController/add/add.component'


const routes: Routes = [
{path:'',redirectTo:'UserHome',pathMatch:'full'},
{ 
  path: 'UserHome', component: UserComponent,
  children:[
          
            {path:"get/:id", component:GetComponent},
    
            {path:"auth", component:AddComponent},
            ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
