import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-technologie-dialog',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    // @ts-ignore
  technologieFormGroup : FormGroup ;
  projectId: any=0;
  constructor(public dialogRef: MatDialogRef<AddComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private activatedRoute: ActivatedRoute, private router : Router) {
    this.projectId= this.activatedRoute.snapshot.paramMap.get('id');
   console.log(this.projectId)
  }
  ngOnInit(): void {
    this.technologieFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]), 
      version: new FormControl('', [Validators.required]),
      license: new FormControl('', [Validators.required]),
      link: new FormControl('', Validators.required)
    });
    console.log(this.technologieFormGroup)
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddTechnologySpec() {
    // Code pour ajouter la spécification HLD au projet
    // Vous pouvez utiliser this.SpecificationFormGroup.value pour obtenir les données du formulaire
    // Assurez-vous que projectId est inclus dans les données
 
    const formData = this.technologieFormGroup.value;
    formData.projectId =localStorage.getItem('projectId'); // Assurez-vous que projectId est inclus
  
    // Ensuite, effectuez l'action d'ajout (par exemple, via une requête HTTP)
  
    // Fermez la boîte de dialogue
    console.log(formData)
    this.dialogRef.close(formData);
  }

}
