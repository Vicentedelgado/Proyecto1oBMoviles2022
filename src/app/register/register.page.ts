import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController,LoadingController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {UserI} from '../models/models';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  userI: UserI={
    uid: null, 
    name: null,
    lastname: null,
    email: null,
    password: null,
    rol: 'turista'
  }

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   
  }

  register(){
   console.log('REGISTRO -->>>',this.userI)
  }

  async showAlert(header, message){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

}
