import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projet } from '../../model/Projet';
import { BusinessOwner } from '../../model/BusinessOwner';
import { TechnologyOwner} from'../../model/TechnologyOwner';
import { User} from'../../model/User';
import { TechnologiesClassification} from'../../model/TechnologiesClassification';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http:HttpClient ) { }
  baseurl=environment.url2;
  baseurl_Angular=environment.url2;
  private apiUrl = 'http://localhost:8090/Projects';
   
  fetchProjet():Observable<Projet[]>
  {
    return this.http.get<Projet[]>(this.baseurl+"/Projects");
  }

  fetchBusinessOwners():Observable<BusinessOwner[]>
  {
    return this.http.get<BusinessOwner[]>(this.baseurl+"/BusinessOwners");
  }

    fetchTechnologyOwners():Observable<TechnologyOwner[]>
  {
    return this.http.get<TechnologyOwner[]>(this.baseurl+"/TechnologyOwners");
  }

  fetchUsers():Observable<User[]>
  {
    return this.http.get<User[]>(this.baseurl+"/Users");
  }

  fetchTechnologiesClassifications():Observable<TechnologiesClassification[]>
  {
    return this.http.get<TechnologiesClassification[]>(this.baseurl+"/TechnologiesClassifications");
  }

  fetchProjetById(id:number):Observable<Projet>
  {

   return this.http.get<Projet>(this.baseurl+"/Projects/"+id);
  }

  addProjet(data:Projet)
  {

    return this.http.post(this.baseurl_Angular+"/Projects/",data);

  }
 
  
  deleteProjet(id:number){

    return this.http.delete(this.baseurl+"/Projects/"+id);

  }
  UpdatProjet(data:Projet):Observable<Projet>
  {
  
    console.log("put")
    console.log(data)
    return this.http.put<Projet>(this.baseurl+"/Projects/"+data.id,data);

  }
 
  getSpecificationsForProject(projectId: number) {
    return this.http.get(`http://localhost:8090/Projects/${projectId}/Specifications`);
  }

  getControlesForProject(projectId: number) {
    return this.http.get(`http://localhost:8090/Projects/${projectId}/Controles`);
  }
  
  saveData(data: any) {
    return this.http.post(this.baseurl_Angular+"/ProjectsCreation",data);
  }
  
  getTechnologyTypeStatistics(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + '/TechnologiesClassifications/TechnologyType');
  }
 
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + '/Users/LineOfservice');
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + '/Projects/SolutionAproach');
  }

  getProjecthosting(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + '/Projects/HostingModel');
  }

}
