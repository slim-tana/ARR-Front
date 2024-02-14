import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ARR';
  showHead:boolean =false;
  constructor(private router:Router){
        router.events.forEach(element => {
          if(element instanceof NavigationStart){
            if(element['url'] == '/auth'){
              this.showHead=false
            }else{
              this.showHead =true;
            }
          }
        });
  }
}
