import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import {UserI} from '../../models/models';
import {FirestoreService} from '../../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login: boolean = false;
  rol: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private firestore: FirestoreService
  ) {
    this.authService.stateUser().subscribe(userlogin=>{
      if(userlogin){
        console.log('esta logeado')
        this.login = true;
        this.getUserDatosRol(userlogin.uid);      
      } else{
        console.log("no esta logeado")
        this.login = false;
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

  getUserDatosRol(uid:string){
    const path = 'Usuarios';
    const id =uid;
    this.firestore.getDoc<UserI>(path,id).subscribe(res =>{
      if(res){
        this.rol= res.rol;
      }
    })
  }

}
