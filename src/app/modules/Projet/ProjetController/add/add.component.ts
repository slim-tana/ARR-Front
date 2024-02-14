import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from 'src/app/modules/model/Projet';
import { ProjetService } from '../../ProjetController/projet.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/modules/model/User';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent  {
  projectId: any;
  data: any;
  tableName: string = ''; // Ajo
  projet!:Projet[];
  ListUser !: User[];

  formulaireGs: FormGroup =  this.formBuilder.group({
    firstName: ['', Validators.required],
    email: ['', Validators.required],
    territory: ['', Validators.required],
    lineOfservice: ['', Validators.required]
  });  

  formulaireTc: FormGroup =  this.formBuilder.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    description: ''
  });


  formulairePm: FormGroup =  this.formBuilder.group({
    projectName: ['', Validators.required],
    toolName: ['', Validators.required],
    linkTotool: ['', Validators.required],
    date: '',
    targetDate: '',
    solutionAproach: ['', Validators.required],
    applicationExposure: ['', Validators.required],
    hostingModel: ['', Validators.required],
    openSourceSoftware: ['', Validators.required],
    linkLicence: '',
    description: '',
  });

  formulaireTOD= this.formBuilder.group({
   
    primaryOwner: ['', Validators.required],
    secondaryOwner: '',
    additionalOwner: ''  
  });


  formulaireBOD= this.formBuilder.group({
    primaryOwner: ['', Validators.required],
    secondaryOwner: '',
    additionalOwner: ''
  });

 
  

    constructor(private service:ProjetService,private router:Router,
      private _snackBar: MatSnackBar,private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
      private http: HttpClient) { }

      ngOnInit(): void {
        this.GetAllProjet();
      }
      GetAllProjet()
      {this.http.get<any>('http://localhost:8090/Users').subscribe({
        next: data => {
          this.ListUser = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    
    }

  onSubmitAllForms() {
    console.log(this.formulairePm.value.description)
    if (
      this.formulaireGs.valid &&
      this.formulaireTc.valid &&
      this.formulairePm.valid &&
      this.formulaireTOD.valid &&
      this.formulaireBOD.valid 
    ) {
    
      const data = {
        formulaireGs: this.formulaireGs.value,
        formulaireTc: this.formulaireTc.value,
        formulairePm: this.formulairePm.value,
        formulaireTOD: this.formulaireTOD.value,
        formulaireBOD: this.formulaireBOD.value
        // Ajoutez d'autres formulaires si nécessaire
      };
      this.formulairePm.value.description= this.formulaireTc.value.description;
      this.service.saveData(data).subscribe(
             (response) => {
               console.log('Données sauvegardées avec succès', response);
               this.router.navigate(['/Projet/ProjetHome/getParent']);
              
             },
             (error) => {
               console.error('Erreur lors de la sauvegarde', error);
               // Gérer les erreurs éventuelles ou afficher des messages d'erreur
             }
           );
         } else {
           // Gérer les erreurs ou afficher des messages d'erreur
           this._snackBar.open("Veuillez remplir correctement tous les formulaires.", 'Fermer', {
             duration: 5000,
           });
      
  }
  
}

}