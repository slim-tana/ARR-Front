import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddContComponent } from '../add/add.component';
import { ActivatedRoute, Router } from '@angular/router';

interface Controle {
  id: number;
  name: string;
  date: string;
  version: string;
  type: string;
  environment: string;
  branchecode: string;
  tags: string;
  pdfDocumentConts?: PdfDocumentCont[];
}
export interface PdfDocumentCont {
  id: number; // ou le type approprié pour l'identifiant
  documentName: string;
  creationDate: string;
  base64Content: string;
  environment: string;
  branchecode: string;
  tags: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent {
  projectId: any = this.activatedRoute.snapshot.paramMap.get('id'); // Initialisez avec une valeur par défaut
  title = 'FrontEnd';
  displayedColumns = ['name' , 'date' , 'version' , 'environment' , 'branchecode' , 'tags' , 'pdfDocuments', 'actions']
  data: Controle[] = [];

  constructor(private http: HttpClient , public dialog: MatDialog,private activatedRoute: ActivatedRoute , private router: Router ){
   
  }

  ngOnInit(): void {
    // Chargez les données initiales
    this.loadData();
    this.projectId= this.activatedRoute.snapshot.paramMap.get('id');
    localStorage.setItem('projectId',this.projectId)
  }
  loadData(){
    this.http.get<any>('http://localhost:8090/Controles/byProjectId/' + this.projectId).subscribe({
      next: data =>{
        this.data = data;
        this.filterByTypeVERACODE();
      },
      error: error => {
        console.error('there was an error !',error);
      }
    })  
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddContComponent, {
      width: '20%',
      data: 'Ajouter'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          name: result.value.name,     
          date: result.value.date,
          version: result.value.version,
          environment: result.value.environment,     
          branchecode: result.value.branchecode,
          tags: result.value.tags,
          type: "PENTEST",
          projectId: localStorage.getItem('projectId')
      
        }
        this.http.post<any>('http://localhost:8090/Controles/save', result.fileDTO).subscribe({
          next: data => {
            this.ngOnInit(); // Rafraîchir les données après l'ajout
          },
          error: error => {
            console.error('Une erreur s\'est produite lors de l\'ajout de la controle !', error);
          }
        });
      }
    });
  }

onEdit(element: any) {
  const dialogRef = this.dialog.open(AddContComponent, {
    width: '20%',
    data: 'Modifier',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const body = {
        name: result.value.name,     
        date: result.value.date,
        version: result.value.version,
        environment: result.value.environment,     
        branchecode: result.value.branchecode,
        tags: result.value.tags,
        type: "VERACODE",
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
      window.location.reload();
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}

filterByTypeVERACODE() {
  this.data = this.data.filter((element) => element.type === 'VERACODE');
}

onDownloadPdf(element: Controle) {
  if (element.pdfDocumentConts && element.pdfDocumentConts.length > 0) {
    const controleId = element.id;
    const documentName = element.pdfDocumentConts[0]?.documentName; // Utilisez le nom du premier document PDF associé
    const filename = documentName ? `${documentName}.pdf` : 'default.pdf'; // Remplacez 'default.pdf' par le nom par défaut si aucun documentName n'est disponible
    window.open(`http://localhost:8090/Controles/${controleId}/pdf?filename=${filename}`, '_blank');
  } else {
    console.warn('Aucun document PDF associé à cette controle.');
  }
}

goBack() {
  this.router.navigate(['/Projet/ProjetHome/detail/' + this.projectId]);
}

}
