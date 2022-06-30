import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController,LoadingController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {UserI} from '../../models/models';
import {FirestoreService} from '../../services/firestore.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  selectvaluerol: string;
  userI: UserI = {
    uid: null,
    name: null,
    lastname: null,
    email: null,
    password: null,
    rol: null
  };

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {}

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const res = await this.authService.register(this.userI).catch(error=>{this.showAlert('Registro fallido ya existe un usuario con este correo', 'Por favor intenta de nuevo!')});
    await loading.dismiss();

    if (res) {
      const pathCollect = 'Usuarios';
      const id = res.user.uid;
      this.userI.uid=id;
      this.userI.password= null;
      await this.firestore.createDoc(this.userI,pathCollect,id);
      this.showAlert('Tu registro', 'Fue exitoso');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Registro fallido', 'Por favor intenta de nuevo!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
