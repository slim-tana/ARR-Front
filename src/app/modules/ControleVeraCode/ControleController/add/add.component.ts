import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-controle',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddContComponent implements OnInit {

    // @ts-ignore
    ControleFormGroup : FormGroup ;
    projectId: any=0;
    fileDTO: any;
  formData:any;
  // Ajoutez ces propriétés
  fileName: string = ''; // Assurez-vous de définir la valeur appropriée
  constructor(public dialogRef: MatDialogRef<AddContComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }


  ngOnInit(): void {
    this.ControleFormGroup = new FormGroup({
      file: new FormControl(null, [Validators.required]),
      fileName: new FormControl(this.fileName),
      environment: new FormControl('', [Validators.required]),
      branchecode: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required])

    });
    console.log(this.ControleFormGroup)
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddVERACODESpec() {
    // Code pour ajouter la spécification HLD au projet
    // Vous pouvez utiliser this.SpecificationFormGroup.value pour obtenir les données du formulaire
    // Assurez-vous que projectId est inclus dans les données
  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.formData.append('environment',this.ControleFormGroup.value.environment );
    this.formData.append('branchecode',this.ControleFormGroup.value.branchecode );
    this.formData.append('tags',this.ControleFormGroup.value.tags );
    this.http.post('http://localhost:8090/Controles/save', this.formData, { headers, observe: 'response' })
    .pipe(
      catchError(error => {
        if (error.status === 200) {
          console.log('Controle enregistrée avec succès');
          this.dialogRef.close();
          window.location.reload();
        } else {
          console.error('Erreur lors de l\'ajout de la controle. Statut:', error.status);
        }
        // Handle the error as needed
        return of(error);
      })
    )
    .subscribe();
  }
  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Nouveau fichier sélectionné:', file);
      this.formData = new FormData();
      console.log("file name",file.name.split('.')[0]);
      console.log("file ",file);
      this.formData.append('fileName',file.name.split('.')[0] );
      this.formData.append('documentType', 'VERACODE');
      this.formData.append('file', file);
      const projectId = localStorage.getItem('projectId');
      this.formData.append('projectId', projectId ? projectId : '');

      this.fileDTO = this.formData;
    }
  }
}
