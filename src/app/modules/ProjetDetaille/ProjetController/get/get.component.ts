import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
/*import { AddContComponent } from '../add/add.component';*/
@Component({
  selector: 'app-root',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class  GetComponent {
  title = 'FrontEnd';
  displayedColumns = ['ticket' ,'projectName' ,  'date' , 'targetDate' , 'statuProduction']
  projects: any[] = [];
  users: any[] = [];
  technologies: any[] = [];

  constructor(private http: HttpClient , public dialog: MatDialog){
   
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8090/Projects').subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Error fetching projects:', error);
      }
    );

    this.http.get<any[]>('http://localhost:8090/Users').subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
    
  }

/*
onAdd(){
  const dialogRef = this.dialog.open(AddContComponent, {
    width: '20%',
    data: 'Add'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result){
      const body = {
        name: result.value.name,     
        date: result.value.date,
        version: result.value.version,
        environment: result.value.environment,     
        branchecode: result.value.branchecode,
        tags: result.value.tags
    
      }
      this.http.post<any>('http://localhost:8090/Controles', body).subscribe({
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
  const dialogRef = this.dialog.open(AddContComponent, {
    width: '20%',
    data: 'Edit',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const body = {
        name: result.value.name,     
        date: result.value.date,
        version: result.value.version,
        environment: result.value.environment,     
        branchecode: result.value.branchecode,
        tags: result.value.tags
      }

      this.http.put<any>('http://localhost:8090/Controles/' + element.id, body).subscribe({
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
  this.http.delete<any>('http://localhost:8090/Controles/' + element.id).subscribe({
    next: data => {
      this.ngOnInit();
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}
*/
}
