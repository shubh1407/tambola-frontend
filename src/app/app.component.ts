import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'cj-app';

  constructor(private router: Router) {
    console.log(environment.apiUrl);
  }

  ngOnInit() {
    this.router.navigate([''])
  }
  
  playGame()
  {
    this.router.navigateByUrl('gameStart');
  }
}
