import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LeadServiceService } from '../lead-service.service';
import { ActivatedRoute, Router } from '@angular/router';

export class Player {

  public gameId: string;
	public playerId: string;
	public numbArray: BoxNumb[];
	public allNumberCrossed: boolean;

constructor(
  gameId: string,
	playerId: string,
	numbArray: BoxNumb[],
	allNumberCrossed: boolean
) {
  this.gameId=gameId;
  this.playerId=playerId;
  this.numbArray=numbArray;
  this.allNumberCrossed=allNumberCrossed;
}
}

export class NumberDrawnResponse
{
  player:Player;
  isWinner:boolean;
  numbDrawn:number;

  constructor(
    player:Player,
    isWinner:boolean,
    numbDrawn:number
  ) {
    this.player=player;
    this.isWinner=isWinner;
    this.numbDrawn=numbDrawn;
  }
}

export class BoxNumb {

  public num:number;
  public pos: number;
  public showGreen: boolean;
  public showCross: boolean;

constructor(
  num:number,
  pos: number,
  showGreen: boolean,
  showCross: boolean
) {
  this.num=num;
  this.pos=pos;
  this.showCross=showCross;
  this.showGreen=showGreen;
}
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  player: Player;
  boxNumb: BoxNumb [];
  gameStatus : String;
  gameStart : boolean;
  gameEnd : boolean;
  numTurn=1;
  numbDrawn:number;
  isWinner:boolean;
  constructor(private readonly leadService : LeadServiceService,private readonly actroute: ActivatedRoute,
    private readonly router : Router) {
    }


  ngOnInit() { 
   this.createGameBoard()
   this.gameStatus='Game is Yet to be Started';
  }

  

  createGameBoard()
  {
    this.leadService.startGameBoard().subscribe(
      response => {
        this.setResponsePlayer(response);
      }
    ); 
  }

  setResponsePlayer(response)
  {
    this.player=response;
    this.boxNumb=this.player.numbArray;
    for(let i = 1; i < 28; i++)
    {
      if(this.boxNumb[i].num==0)
      {
        this.boxNumb[i].num=null;
      }
    }
  }

  checkStatusGame()
  {
        this.leadService.checkGameStatus(this.player.gameId).subscribe(
          response=>{
            this.gameStart=response;
          }
        );
        if(this.gameStart)
        {
            this.gameStatus="Game Started";
        }
  }

  checkStatusEndGame()
  {
      this.leadService.checkGameEndStatus(this.player.gameId).subscribe(
        response=>{
          this.gameEnd=response;
        }
        );
        if(this.gameEnd)
        {
            this.gameStatus="Game Ended";
        }
  }

  numberDrawn()
  {
      if(this.gameStatus==="Game Ended")
      {
        this.gameStatus="Game Ended";
        this.gameStart=false;
      }
      else{
      this.leadService.randomNumberDrawn(this.numTurn,this.player).subscribe(
        response => {
          this.player=response.player;
          this.boxNumb=this.player.numbArray;
          for(let i = 1; i < 28; i++)
          {
            if(this.boxNumb[i].num==0)
            {
              this.boxNumb[i].num=null;
            }
          }
          this.isWinner=response.isWinner;
          this.numbDrawn=response.numbDrawn;
          if(this.numbDrawn==0)
          {
            this.gameStatus="Game Ended";
          }
          else
            this.gameStatus="Number Drawn :"+this.numbDrawn;
        }
      );
      this.numTurn=this.numTurn+1;
      if(this.isWinner || this.numTurn==100)
      {
        this.endGame();
      } 
    }
  }

  startGame()
  {
    this.leadService.startGame(this.player.gameId).subscribe(
      response=>{
        this.gameStatus=response;
      }
    );
    this.gameStart=true;
  }

  endGame()
  {
    this.leadService.endGame(this.player.gameId).subscribe(
      response=>{
        this.gameStatus="Game Ended";
      }
    );
    this.gameStart=false;
    this.gameStatus="Game Ended";
  }

}
