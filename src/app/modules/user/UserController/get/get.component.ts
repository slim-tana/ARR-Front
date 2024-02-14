import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  timeZone: string;
  territory: string;
  lineOfservice: string;
  grade: string;
  location: string;
  picture: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent {
  projectId: any = this.activatedRoute.snapshot.paramMap.get('id'); // Initialisez avec une valeur par défaut
  title = 'FrontEnd';
  displayedColumns = ['firstName' , 'lastName' ,  'email' , 'timeZone' , 'territory' , 'lineOfservice' ,  'grade' , 'location' , 'picture' ,'actions']
  data : User[] = [];

  constructor(private http: HttpClient , public dialog: MatDialog,private activatedRoute: ActivatedRoute , private router: Router){
   
  }

  ngOnInit(): void{
    this.projectId= this.activatedRoute.snapshot.paramMap.get('id');
    localStorage.setItem('projectId',this.projectId)
    this.http.get<any>('http://localhost:8090/Users/byProjectId/'+ this.projectId).subscribe({
      next: data =>{
        this.data = data;

      },
      error: error => {
        console.error('there was an error !',error);
      }
    })  
  }

onAdd(){
  const dialogRef = this.dialog.open(AddComponent, {
    width: '20%',
    data: 'Ajouter'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result){
      const body = {
        firstName: result.value.firstName,
        lastName: result.value.lastName,
        email: result.value.email,
        timeZone: result.value.timeZone,
        territory: result.value.territory,
        lineOfservice: result.value.lineOfservice,
        grade: result.value.grade,
        location: result.value.location,
        picture: result.value.picture,
        projectId: localStorage.getItem('projectId')
      }
      
      this.http.post<any>('http://localhost:8090/Users', body).subscribe({
        next: data =>{
          this.ngOnInit();
        },
        error: error => {
          console.error('there was an error !',error);
        }
      }) 
    }
  });
}

onEdit(element: any) {
  const dialogRef = this.dialog.open(AddComponent, {
    width: '20%',
    data: 'Modifier',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const body = {
        firstName: result.value.firstName,
        lastName: result.value.lastName,
        email: result.value.email,
        timeZone: result.value.timeZone,
        territory: result.value.territory,
        lineOfservice: result.value.lineOfservice,
        grade: result.value.grade,
        location: result.value.location,
        picture: result.value.picture,
      }

      this.http.put<any>('http://localhost:8090/Users/' + element.id, body).subscribe({
        next: data => {
          this.ngOnInit();
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  });
}

onDelete(element: any) {
  this.http.delete<any>('http://localhost:8090/Users/' + element.id).subscribe({
    next: data => {
      this.ngOnInit();
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}


goBack() {
  this.router.navigate(['/Projet/ProjetHome/detail/' + this.projectId]);
}
}
