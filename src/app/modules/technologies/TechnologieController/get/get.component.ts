import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { ActivatedRoute, Router } from '@angular/router';

interface Technology {
  id: number;
  name: string;
  version: string;
  license: string;
  link: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent {
  projectId: any = this.activatedRoute.snapshot.paramMap.get('id'); // Initialisez avec une valeur par défaut
  title = 'FrontEnd';
  displayedColumns = ['name' , 'version' ,  'license' , 'link' , 'actions']
  data : Technology[] = [];

  constructor(private http: HttpClient , public dialog: MatDialog,private activatedRoute: ActivatedRoute , private router: Router){
   
  }

  ngOnInit(): void{
    this.projectId= this.activatedRoute.snapshot.paramMap.get('id');
    localStorage.setItem('projectId',this.projectId)
    this.http.get<any>('http://localhost:8090/technologies/byProjectId/'+ this.projectId).subscribe({
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
        name: result.value.name,
        version: result.value.version,
        license: result.value.license,
        link: result.value.link,
        projectId: localStorage.getItem('projectId')
      }
      this.http.post<any>('http://localhost:8090/technologies', body).subscribe({
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
        name: result.value.name,
        version: result.value.version,
        license: result.value.license,
        link: result.value.link
      }

      this.http.put<any>('http://localhost:8090/technologies/' + element.id, body).subscribe({
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
  this.http.delete<any>('http://localhost:8090/technologies/' + element.id).subscribe({
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
