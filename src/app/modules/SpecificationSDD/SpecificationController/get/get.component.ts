import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSpecComponent } from '../add/add.component';
import { ActivatedRoute, Router } from '@angular/router';

interface Specification {
  id: number;
  name: string;
  date: string;
  version: string;
  type: string;
  pdfDocuments?: PdfDocument[];
}

export interface PdfDocument {
  id: number; // ou le type approprié pour l'identifiant
  documentName: string;
  creationDate: string;
  base64Content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent {
  projectId: any = this.activatedRoute.snapshot.paramMap.get('id'); // Initialisez avec une valeur par défaut
  title = 'FrontEnd';
  displayedColumns = ['name' , 'date' , 'version' , 'pdfDocuments',  'actions']
  data: Specification[] = [];

  constructor(private http: HttpClient , public dialog: MatDialog,private activatedRoute: ActivatedRoute , private router: Router){
   
  }

  ngOnInit(): void {
    // Chargez les données initiales
    this.loadData();
    this.projectId= this.activatedRoute.snapshot.paramMap.get('id');
    localStorage.setItem('projectId',this.projectId)
  }
  loadData(){
    this.http.get<any>('http://localhost:8090/Specifications/byProjectId/' + this.projectId).subscribe({
      next: data =>{
        this.data = data;
        this.filterByTypeSDD();
      },
      error: error => {
        console.error('there was an error !',error);
      }
    })  
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddSpecComponent, {
      width: '20%',
      data: 'Ajouter'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post<any>('http://localhost:8090/Specifications/save', result.fileDTO).subscribe({
          next: data => {
            this.ngOnInit(); // Rafraîchir les données après l'ajout
          },
          error: error => {
            console.error('Une erreur s\'est produite lors de l\'ajout de la spécification !', error);
          }
        });
      }
    });
  }



onDelete(element: any) {
  this.http.delete<any>('http://localhost:8090/Specifications/' + element.id).subscribe({
    next: data => {
      this.ngOnInit();
      window.location.reload();
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}


onDownloadPdf(element: Specification) {
  if (element.pdfDocuments && element.pdfDocuments.length > 0) {
    const specificationId = element.id;
    const documentName = element.pdfDocuments[0]?.documentName; // Utilisez le nom du premier document PDF associé
    const filename = documentName ? `${documentName}.pdf` : 'default.pdf'; // Remplacez 'default.pdf' par le nom par défaut si aucun documentName n'est disponible
    window.open(`http://localhost:8090/Specifications/${specificationId}/pdf?filename=${filename}`, '_blank');
  } else {
    console.warn('Aucun document PDF associé à cette spécification.');
  }
}

filterByTypeSDD() {
  this.data= this.data.filter((element) => element.type === 'SDD');
}

goBack() {
  this.router.navigate(['/Projet/ProjetHome/detail/' + this.projectId]);
}

}
