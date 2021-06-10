import { Injectable } from '@angular/core';
import { LeadList, MarkLead } from './lead-dashboard/lead-dashboard.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NumberDrawnResponse, Player } from './game-board/game-board.component';

@Injectable({
  providedIn: 'root'
})
export class LeadServiceService {

  public url:string;
  constructor(
    private readonly httpClient : HttpClient
  ) { 
    this.url=environment.apiUrl
  }

retrieveAllLeads()
  {
      return this.httpClient.get<LeadList[]>(`${this.url}/api/leads/?location_string=India`);
  }

  deleteLeadById(id)
  {
    return this.httpClient.delete(`${this.url}/api/leads/${id}`);
  }

  createLead(leadLists : LeadList)
  {
    return this.httpClient.post(`${this.url}/api/leads/`,leadLists);
  }

  updateLead(markLead : MarkLead,id){
    return this.httpClient.put(`${this.url}/api/mark_lead/${id}`,markLead);
  }

  startGameBoard(){
    return this.httpClient.get<Player>(`${this.url}/showBoard?isFirstTime=true`);
  }

  checkGameStatus(id){
    return this.httpClient.get<boolean>(`${this.url}/getGameStatus/${id}`);
  }

  checkGameEndStatus(id)
  {
    return this.httpClient.get<boolean>(`${this.url}/checkGameEnd/${id}`);
  }

  startGame(id)
  {
    return this.httpClient.get<String>(`${this.url}/startGame?gameId=${id}`);
  }

  endGame(id)
  {
    return this.httpClient.get<String>(`${this.url}/endGame?gameId=${id}`);
  }

  randomNumberDrawn(turnNum,player){
    return this.httpClient.post<NumberDrawnResponse>(`${this.url}/numberDrawn/${turnNum}`,player);
  }
}
