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

    this.obj_link = this.data.tip[0].tip_link;
    this.nameCh = this.data.tip[0].tip_name;
    this.colorCh = this.data.tip[0].tip_color;
    console.log(this.obj_link);
    console.log(this.obj_link);
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
  }
  async getUser() {
    const data = await this.localdata.getData();
    console.log(data);
  }
}
