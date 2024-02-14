import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from 'src/app/modules/model/Projet';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-get-parent',
  templateUrl: './get-parent.component.html',
  styleUrls: ['./get-parent.component.css']
})
export class GetParentComponent implements OnInit {
  p: number = 1; // Initialisez la variable pour gérer la pagination
  itemsPerPage: number = 0; // Nombre d'éléments par page
  pagedProjects: Projet[] = []; // Initialisez la liste paginée des projets avec vos données
  ListProjet: Projet[] = []; // Liste complète de vos projets
  searchTerm: string = '';

  constructor(private service: ProjetService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllProjet();
  }

  GetAllProjet() {
    console.log("getallProjets");
    this.service.fetchProjet().subscribe(
      (projects: Projet[]) => {
        console.log(projects);
        this.ListProjet = projects;
        this.itemsPerPage = projects.length;
        this.filterProjects();

        // Appel de la méthode pour paginer les projets
        this.paginateProjects();
      },
      (error) => {
        console.log(error.status);
      }
    );
  }

  filterProjects() {
    if (this.searchTerm) {
      this.ListProjet = this.ListProjet.filter(project =>
        project.projectName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }


  Delete(id: number) {
    this.service.deleteProjet(id).subscribe(() => { }, (error) => { console.log(error) });
    console.log("----------------------------");
    this.GetAllProjet();
  }

  Update(id: number) {
    this.router.navigate(['/Projet/ProjetHome/update/', id]);
  }

  // Méthode pour paginer les projets
  paginateProjects() {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedProjects = this.ListProjet.slice(startIndex, endIndex);
  }

  // Méthode qui gère le changement de page
  onPageChange(pageNumber: number) {
    this.p = pageNumber;
    this.paginateProjects();
  }

  onSearch() {
    // Appel de la méthode pour filtrer les projets en fonction du terme de recherche
    this.filterProjects();
  
    // Appel de la méthode pour paginer les projets
    this.paginateProjects();
  }
  
// Dans GetParentComponent.ts
sortDirection: 'asc' | 'desc' = 'asc'; // Initialisez la direction du tri

sortProjectsByDate() {
  this.ListProjet.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (this.sortDirection === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  // Inversez la direction du tri pour le prochain clic
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

  // Appel de la méthode pour paginer les projets après le tri
  this.paginateProjects();
}

  
  
}
