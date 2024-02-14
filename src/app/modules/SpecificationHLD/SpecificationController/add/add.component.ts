import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-specification',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddSpecComponent implements OnInit {

  SpecificationFormGroup!: FormGroup;
  projectId: any = 0;
  fileDTO: any;
  formData:any;
  // Ajoutez ces propriétés
  fileName: string = ''; // Assurez-vous de définir la valeur appropriée


  constructor(public dialogRef: MatDialogRef<AddSpecComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {}

  ngOnInit(): void {
    this.SpecificationFormGroup = new FormGroup({
      file: new FormControl(null, [Validators.required]),
      fileName: new FormControl(this.fileName),

    });
    console.log(this.SpecificationFormGroup)
  }
  

  onCancel() {
    this.dialogRef.close();
  }

  onAddHLDSpec() {
    //const formData = this.SpecificationFormGroup.value;
    //formData.projectId = localStorage.getItem('projectId');
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.http.post('http://localhost:8090/Specifications/save', this.formData, { headers, observe: 'response' })
    .pipe(
      catchError(error => {
        if (error.status === 200) {
          console.log('Spécification enregistrée avec succès');
          this.dialogRef.close();
          window.location.reload();
        } else {
          console.error('Erreur lors de l\'ajout de la spécification. Statut:', error.status);
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
      this.formData.append('documentType', 'HLD');
      this.formData.append('file', file);
      const projectId = localStorage.getItem('projectId');
      this.formData.append('projectId', projectId ? projectId : '');

      this.fileDTO = this.formData;
    }
  }
}
