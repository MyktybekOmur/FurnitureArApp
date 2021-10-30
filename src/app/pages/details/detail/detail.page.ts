import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public data: any;
  public items: any = [];
  public obj_link: string;
  public nameCh: string;
  public colorCh: any;
  //npm install @ionic-native/core
  slidesOptions = {
    slidesPerView: 1.5
  }
  constructor(private activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {

    this.data = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    this.obj_link = this.data[0].tip_link;
    this.nameCh = this.data[0].tip_name;
    this.colorCh = this.data[0].tip_color;
    console.log(this.obj_link);
  }

  test(item) {
    this.obj_link = item.tip_link;
    this.nameCh = item.tip_name;
    this.colorCh = item.tip_color;
  }
}
