import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/modules/model/Projet';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-get-details',
  templateUrl: './get-details.component.html',
  styleUrls: ['./get-details.component.css']
})


export class GetDetailsComponent implements OnInit {
 
  id!:number;
  project !:Projet;
  isLoading = true;
  @ViewChild('content') content!: ElementRef;  


 
  constructor(private route:ActivatedRoute, private service:ProjetService,private router:Router) { }

  
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.GetAllProjet();

  }
  GetAllProjet()
  {
    this.service.fetchProjetById(this.id).subscribe((res:any)=>{
    console.log(res);

    this.project = res;

    this.isLoading = false;
    
  },
  (error)=>{
    console.log(error)
  
  });
}
 
  Delete(id:number)
  {
    this.service.deleteProjet(id).subscribe(()=>{},(error)=>{console.log(error)});
    console.log("----------------------------")
    this.router.navigateByUrl('/Projet/ProjetHome/getParent');
  }
  Update(id:number)
  {
    this.router.navigate(['/Projet/ProjetHome/update/',id])
  }
 
 

 
  
}
