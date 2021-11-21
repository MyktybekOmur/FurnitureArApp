import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public items: any = [];
  constructor(
    private localdata: StorageService,
    private router: Router,
    public alertController: AlertController
  ) {
    this.getDate();
  }
  ionViewWillEnter() {
    this.getDate();
  }

  //get items
  async getDate() {
    this.items = await this.localdata.getData();
  }
  //remove
  removeItem(id) {
    this.localdata.removeData(id);
    this.localdata.presentToast('Başarılı silindi!', 'success');
    setTimeout(() => {
      this.getDate();
    }, 500);
  }
  //open details
  onClick(item) {
    this.router.navigate(['detail', JSON.stringify(item)]);
  }

  async confirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Onay!',
      message: 'Silmek ister misiniz!!!',
      buttons: [
        {
          text: 'iptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'sil',
          handler: () => {
            this.removeItem(id);
          },
        },
      ],
    });

    await alert.present();
  }
}
