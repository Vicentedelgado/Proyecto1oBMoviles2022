import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login: boolean = false;
  constructor(
              private authService: AuthService
  ) {
    this.authService.stateUser().subscribe(userlogin=>{
      if(userlogin){
        console.log('esta logeado')
        this.login=true;

      } else{
        console.log("no esta logeado")
        this.login= false;
      }
    })
  }
}
