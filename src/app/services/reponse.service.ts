import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reponses } from '../models/reponses';
import { ServerConstant } from '../_Constant/server-constant';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

   // Déclarons des variables
   constant: ServerConstant = new ServerConstant();
   // Le serve backend
   public host = this.constant.host;

  // Créeons une instance de service Http
  constructor(private http: HttpClient) { }

  // Une fonction qui permettra d'ajouter une Reponses
  save(reponse: Reponses, idquestion: number): Observable<Reponses> {
    return this.http.post<Reponses>(`${this.host}/reponses/create/${idquestion}`, reponse);
  }

   // *****************************      LISTE DE REPONSES       *******************************
  getReponseList(): Observable<Reponses[]> {
    return this.http.get<Reponses[]>(`${this.host}/reponses/listResponses`);
  }
}
