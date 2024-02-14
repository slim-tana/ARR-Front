import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/modules/model/Projet';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private ac:ActivatedRoute,private service:ProjetService,private router:Router,
    private _snackBar: MatSnackBar) { }

    projet = new Projet();
  id=this.ac.snapshot.params['id'];
  
  ngOnInit(): void {
    this.getProjet();
  }
 

  getProjet()
  {
    this.service.fetchProjetById(this.id).subscribe(
      (res:Projet)=>
      {
        this.projet=res;
        console.log(res.id)
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  UpdateProjet(data:Projet){
    
    data.id=this.id;
    this.service.UpdatProjet(data).subscribe()
    this.router.navigateByUrl("/Projet/ProjetHome/getParent");
    this._snackBar.open("Projet created successfully ");
  }
  

}
