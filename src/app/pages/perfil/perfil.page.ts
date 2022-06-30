import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AvatarService } from '../../services/avatar.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{

  profile = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.avatarService.getUserProfile().subscribe((data)=>{
      this.profile=data;
    });
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

  async changeImage(){

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();
      
      if (!result){
        const alert = await this.alertController.create({
          header: 'Carga Fallida',
          message: 'Hubo un problema al cargar tu foto',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }

    } else {
      
    }
  }

}
