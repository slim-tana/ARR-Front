// add.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (token: string) => {
          if (token) {
            console.log('Authentication successful', token);
            this.router.navigate(['/Projet/ProjetHome/getParent']);
            // Effectuez ici les actions nécessaires après une authentification réussie
          } else {
            console.error('Unexpected response format. Token not found.');
            this.errorMessage = 'Authentication failed. Unexpected response format.';
          }
        },
        (error: any) => {
          console.error('Authentication failed', error);
          this.errorMessage = 'Authentication failed. Please check your credentials.';
        }
      );
  }
}
