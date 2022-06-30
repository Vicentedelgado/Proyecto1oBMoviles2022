import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.authService.stateUser().subscribe(userlogin=>{
      if(userlogin){
        console.log('esta logeado')
        this.login = true;
        console.log(this.login);

      } else{
        console.log("no esta logeado")
        this.login = false;
        console.log(this.login);
      }
    })
  }

  async logout(){
    await this.authService.logout();
    const alert = await this.alertController.create({
      message: 'Sesión Finalizada',
      buttons: ['Aceptar'],
    });
    await alert.present();
    this.router.navigateByUrl('/',{replaceUrl:true});
  }

  

}
