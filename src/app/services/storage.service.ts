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
    await this.storage.create();
  }
  getData() {
    return this.storage.get(USER_KEY) || [];
  }

  async addData(item) {
    const storedData = (await this.storage.get(USER_KEY)) || [];
    const res = storedData.find((el) => el.id === item.id);
    if (!res) {
      storedData.push(item);
    }

    return this.storage.set(USER_KEY, storedData);
  }

  async removeData(id) {
    //this.storage.clear();
    const storedData = (await this.storage.get(USER_KEY)) || [];
    if (storedData) {
      const res = storedData.filter((item) => item.id !== id);
      return this.storage.set(USER_KEY, res);
    }

    /*const storedData = await this.storage.get(USER_KEY) || [];
    storedData.splice(item, 1);
    return this.storage.set(USER_KEY, storedData);*/
  }

  //check fovorit item
  async check(id) {
    const storedData = (await this.storage.get(USER_KEY)) || [];
    if (storedData) {
      const res = storedData.filter((item) => item.id === id);
      return res;
    }
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
