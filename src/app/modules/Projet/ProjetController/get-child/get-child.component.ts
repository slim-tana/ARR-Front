import { Component, EventEmitter ,Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from 'src/app/modules/model/Projet';
import { ProjetService } from '../projet.service';
import { GetParentComponent } from '../get-parent/get-parent.component';

@Component({
  selector: 'app-get-child',
  templateUrl: './get-child.component.html',
  styleUrls: ['./get-child.component.css']
})
export class GetChildComponent implements OnInit {

  

  @Input() projet!:Projet;
  @Input() photoURL:any;

  @Output() notif= new EventEmitter<any>();
  @ViewChild(GetParentComponent) c!:GetChildComponent;
  
    constructor(private service:ProjetService,private router:Router) { }
  
    

  ngOnInit(): void {
  }
  Delete()
  {
    this.notif.emit(this.projet);

  }
  UpdateUser(id:number)
  {
    this.router.navigate(['Projet/ProjetHome/update',id])
  }
}
