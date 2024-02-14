import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Ajout du plugin interaction
import { ProjetService } from '../projet.service';
import { Projet } from 'src/app/modules/model/Projet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
})
export class CalendrierComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Ajout du plugin interaction
    events: [],
    eventColor: '#378006', // Couleur par défaut pour tous les événements
    selectable: true, // Permet la sélection de plage de temps
    selectMirror: true, // Affiche une zone de sélection fantôme
    dayMaxEvents: true, // Affiche le nombre d'événements maximum par jour
  };

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    this.projetService.fetchProjet().subscribe((projects: Projet[]) => {
      this.calendarOptions.events = projects.map((project: Projet, index: number) => ({
        title: project.projectName,
        start: project.date,
        end: project.targetDate,
        color: this.generateEventColor(index),
        extendedProps: {
          projectId: project.id, // Ajoutez l'ID du projet aux propriétés étendues de l'événement
        },
      }));
    });
    this.calendarOptions.eventClick = this.handleEventClick.bind(this);

  }

  private generateEventColor(index: number): string {
    const colors = ['#ffd000', '#ff0f00', '#b05000', '#0050b0', '#00b050'];
    return colors[index % colors.length];
  }

  handleEventClick(event: any): void {
    // Naviguer vers les détails du projet avec l'ID du projet
    const projectId = event.event.extendedProps.projectId;
    this.router.navigate(['/Projet/ProjetHome/detail', projectId]);
  }
}
