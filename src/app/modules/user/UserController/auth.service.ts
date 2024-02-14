// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
}

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:8090/auth';
  
    constructor(private http: HttpClient, private router: Router) {}
  
    login(email: string, password: string): Observable<string> {
      const credentials = { email, password };
  
      return this.http.post<string>(`${this.apiUrl}`, credentials, { responseType: 'text' as 'json' })
        .pipe(
          map(response => this.extractToken(response)),
          catchError(error => {
            console.error('Authentication failed', error);
  
            // Vérifier si la réponse est une chaîne JSON malformée
            if (error instanceof HttpErrorResponse && error.error instanceof ProgressEvent) {
              console.error('Malformed JSON response from the server');
              return throwError('Malformed JSON response from the server');
            }
  
            // Log des détails de l'erreur
            console.error('Error details:', error.error);
  
            // Retourne une Observable vide en cas d'erreur
            return new Observable<string>();
          })
        );
    }
  
    private extractToken(response: string): string {
      // Vérifiez si la réponse est une chaîne non vide
      if (response.trim() !== '') {
        return response;
      } else {
        // Log si la réponse ne contient pas le token attendu
        console.error('Unexpected response format. Token not found.');
        return '';
      }
    }
  }