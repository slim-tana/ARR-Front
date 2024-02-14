import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Projet } from 'src/app/modules/model/Projet';
import { User } from 'src/app/modules/model/User';
import { TechnologiesClassification } from 'src/app/modules/model/TechnologiesClassification';
import { TechnologyOwner } from 'src/app/modules/model/TechnologyOwner';
import { BusinessOwner } from 'src/app/modules/model/BusinessOwner';
import { ProjetService } from '../projet.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  
  constructor(private service:ProjetService,private router:Router,
    private _snackBar: MatSnackBar,private http: HttpClient
    ) { }
  ListProjet !: Projet[];
  ListUser !: User[];
  ListTechnologiesClassification !:   TechnologiesClassification[];
  ListTechnologyOwner !:   TechnologyOwner[];
  ListBusinessOwners !:    BusinessOwner[];

 
  ngOnInit(): void {
    this.GetAllProjet();
  }
  GetAllProjet()
  {this.http.get<any>('http://localhost:8090/Projects').subscribe({
    next: data => {
      this.ListProjet = data;
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });

  this.http.get<any>('http://localhost:8090/Users').subscribe({
    next: data => {
      this.ListUser = data;
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });

  this.http.get<any>('http://localhost:8090/TechnologiesClassifications').subscribe({
    next: data => {
      this.ListTechnologiesClassification = data;
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });

  this.http.get<any>('http://localhost:8090/TechnologyOwners').subscribe({
    next: data => {
      this.ListTechnologyOwner = data;
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });

  this.http.get<any>('http://localhost:8090/BusinessOwners').subscribe({
    next: data => {
      this.ListBusinessOwners = data;
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });

  }
  
  Delete(id:number)
  {
    this.service.deleteProjet(id).subscribe(()=>{},(error)=>{console.log(error)});
    console.log("----------------------------")
    this.GetAllProjet();
  }
  Update(id:number)
  {
    this.router.navigate(['/Projet/ProjetHome/update/',id])
  }


  

}



