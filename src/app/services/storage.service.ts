import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const USER_KEY = 'items';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.init();
  }

  async init() {
    console.log('1');
    await this.storage.create();
    console.log('2');
  }
  getData() {
    return this.storage.get(USER_KEY) || [];
  }

  async addData(item) {
    console.log('3');
    const storedData = (await this.storage.get(USER_KEY)) || [];
    const res = storedData.find((el) => el.id === item.id);
    if (!res) {
      storedData.push(item);
      console.log('Kaydettim');
    }
    console.log('4');

    return this.storage.set(USER_KEY, storedData);
  }

  async removeData(id) {
    //this.storage.clear();
    const storedData = (await this.storage.get(USER_KEY)) || [];
    if (storedData) {
      const res = storedData.filter((item) => item.id !== id);
      console.log('geldim');
      return this.storage.set(USER_KEY, res);
    }

    /*const storedData = await this.storage.get(USER_KEY) || [];
    storedData.splice(item, 1);
    return this.storage.set(USER_KEY, storedData);*/
  }

  //Toest
  async presentToast(mesaj, renk) {
    const toast = await this.toastController.create({
      message: mesaj,
      color: renk,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }
}
