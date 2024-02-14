import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjetService } from '../projet.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stats',
  template: `
  
  <div #captureContainer class="chart-container">
      <div class="column">
        <google-chart [data]="formattedTechnologyChartData"></google-chart>
        <google-chart [data]="formattedUsersChartData"></google-chart>
      </div>
      <div class="column">
        <google-chart [data]="formattedProjectsChartData"></google-chart>
        <google-chart [data]="formattedProjectHostingChartData"></google-chart>
      </div>
    </div>
    <div class="center-button">
    <button (click)="captureAndDownload()">
      <i class="material-icons">cloud_download</i> Télécharger le PDF
    </button>
    `,
  styles: [`
  .chart-container {
    width: 90%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
  }

  .column {
    flex: 1;
  }

  .google-chart {
    width: 100%;
    min-height: 200px; /* Hauteur minimale souhaitée */
    margin-bottom: 20px;
  }

  .center-button {
    text-align: center;
    margin-top: 20px; /* Ajustez la marge selon vos préférences */
  }
  
  .center-button button {
    padding: 10px;
    font-size: 16px;
    background-color: #2196F3; /* Couleur de fond du bouton */
    color: #fff; /* Couleur du texte du bouton */
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`,
],
encapsulation: ViewEncapsulation.None, // Add this line
})

export class StatisticsComponent implements OnInit {
  @ViewChild('captureContainer') captureContainer!: ElementRef<HTMLDivElement>;

  formattedTechnologyChartData: GoogleChartInterface = {
    chartType: 'BarChart',
    dataTable: [['Technology Type', 'Count']],
    options: {
      title: 'Statistiques sur les types de technologies',
      colors: ['#dc6900', '#2196F3', '#FFC107', '#FF5722', '#E91E63'],
      legend: { position: 'top' },
      animation: {
        startup: true,
        easing: 'out',
        duration: 1000,
      },
      vAxis: {
        minValue: 0,
      },
      hAxis: {
        title: 'Type de Technologie',
      },
      height: 400,
    },
  };

  formattedUsersChartData: GoogleChartInterface = {
    chartType: 'BarChart',
    dataTable: [['departement Type', 'Count']],
    options: {
      title: 'Statistiques sur les types de départements',
      colors: ['#E669A2', '#2196F3', '#FFC107', '#FF5722', '#E91E63'],
      legend: { position: 'top' },
      animation: {
        startup: true,
        easing: 'out',
        duration: 1000,
      },
      vAxis: {
        minValue: 0,
      },
      hAxis: {
        title: 'Type de département ',
      },
      height: 400,
    },
  };

  formattedProjectsChartData: GoogleChartInterface = {
    chartType: 'BarChart',
    dataTable: [['Approche de solution Type', 'Count']],
    options: {
      title: 'Statistiques sur les types de approche de solution',
      colors: ['#FFC107', '#FF5722', '#E91E63', '#00796B', '#2196F3'],
      legend: { position: 'top' },
      animation: {
        startup: true,
        easing: 'out',
        duration: 1000,
      },
      vAxis: {
        minValue: 0,
      },
      hAxis: {
        title: 'Type de Approche de solution',
      },
      height: 400,
    },
  };

  formattedProjectHostingChartData: GoogleChartInterface = {
    chartType: 'BarChart',
    dataTable: [['Modele d\hebergement Type', 'Count']],
    options: {
      title: 'Statistiques sur les types d\'hébergement de projets',
      colors: ['#FF5722', '#E91E63', '#00796B', '#2196F3', '#FFC107'],
      legend: { position: 'top' },
      animation: {
        startup: true,
        easing: 'out',
        duration: 1000,
      },
      vAxis: {
        minValue: 0,
      },
      hAxis: {
        title: 'Type Modele d\hebergement',
      },
      height: 400,
    },
  };

  constructor(private service: ProjetService) {}

  ngOnInit(): void {
    this.service.getTechnologyTypeStatistics().subscribe(
      (technologyStatistics) => {
        this.formatChartData(technologyStatistics, this.formattedTechnologyChartData);
      },
      (error) => {
        console.error('Error fetching technology type statistics', error);
      }
    );

    this.service.getUsers().subscribe(
      (userStatistics) => {
        this.formatChartData(userStatistics, this.formattedUsersChartData);
      },
      (error) => {
        console.error('Error fetching departement statistics', error);
      }
    );

    this.service.getProjects().subscribe(
      (projectStatistics) => {
        this.formatChartData(projectStatistics, this.formattedProjectsChartData);
      },
      (error) => {
        console.error('Error fetching project statistics', error);
      }
    );

    this.service.getProjecthosting().subscribe(
      (projectHostingStatistics) => {
        this.formatChartData(projectHostingStatistics, this.formattedProjectHostingChartData);
      },
      (error) => {
        console.error('Error fetching project hosting statistics', error);
      }
    );
  }

  private formatChartData(statistics: any, chartData: GoogleChartInterface): void {
    const entries = Object.entries(statistics);
    chartData.dataTable = [['Type', 'Count'], ...entries.map(([type, count]) => [type, count])];
  }

  captureAndDownload(): void {
    console.log('Capture and Download method called.'); // Ajoutez ce message
  
    if (this.captureContainer) {
      const container = this.captureContainer.nativeElement;
      
      console.log('Container element:', container); // Ajoutez ce message
  
      html2canvas(container).then((canvas: HTMLCanvasElement) => {
        console.log('HTML Canvas generated:', canvas); // Ajoutez ce message
        
        // Utilisez le canvas pour générer le PDF avec pdfmake
        const pdfDocGenerator = pdfMake.createPdf({
          content: [
            {
              image: canvas.toDataURL('image/png'),
              width: 500,
            },
          ],
        });
  
        console.log('PDF Document Generator:', pdfDocGenerator); // Ajoutez ce message
  
        pdfDocGenerator.download('statistiques.pdf');
        console.log('Download initiated.'); // Ajoutez ce message
      });
    } else {
      console.error('Capture container not found.'); // Ajoutez ce message d'erreur
    }
  }
  
}
