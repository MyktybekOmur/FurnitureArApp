import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public data: any;
  public items: any = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public obj_link: string;
  public nameCh: string;
  public colorCh: any;
  public checkF = false;
  //npm install @ionic-native/core
  slidesOptions = {
    slidesPerView: 1.5,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private localdata: StorageService
  ) {}

  ngOnInit() {
    this.data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    console.log(this.data);
    this.obj_link = this.data.objLink;
    this.nameCh = this.data.name;
    this.colorCh = this.data.color;
    this.checkFavorit();
  }

  test(item) {
    this.obj_link = item.tip_link;
    this.nameCh = item.tip_name;
    this.colorCh = item.tip_color;
  }
  //add local data
  async addItem() {
    await this.localdata.addData(this.data);
    this.localdata.presentToast('Başarılı eklendi!', 'success');
    this.checkFavorit();
  }
  //remove fovorit
  removeItem(id) {
    this.localdata.removeData(id);
    this.localdata.presentToast('Başarılı silindi!', 'success');
    setTimeout(() => {
      this.checkFavorit();
    }, 200);
  }
  async getUser() {
    const data = await this.localdata.getData();
  }
  async checkFavorit() {
    const res = await this.localdata.check(this.data.id);
    if (res.length !== 0) {
      this.checkF = true;
    } else {
      this.checkF = false;
    }
  }
}
