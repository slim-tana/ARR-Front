import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-controle',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddContComponent implements OnInit {

    // @ts-ignore
    ControleFormGroup : FormGroup ;
  constructor(public dialogRef: MatDialogRef<AddContComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {
    this.ControleFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]), 
      date: new FormControl('', [Validators.required]),
      version: new FormControl('', [Validators.required]),
      environment: new FormControl('', [Validators.required]), 
      branchecode: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),

    });
    console.log(this.ControleFormGroup)
  }

  onCancel() {
    this.dialogRef.close();
  }

}
