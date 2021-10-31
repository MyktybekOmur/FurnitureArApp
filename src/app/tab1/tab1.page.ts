import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public items: any = [];
  public temp3d: any;
  public classCh: any = [];
  public categoryCh: string;
  slidesOptions = {
    slidesPerView: 1.5
  }

  constructor(public router: Router, private http: HttpClient) {
    this.items = [{ "category": "room", "name": "Red Sofa", "icon": "img/redSofa.png", tip: [{ "tip_name": "Red Sofa", "tip_icon": "img/redSofa.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/3.glb", "tip_color": "#F3BDB3" }, { "tip_name": "Chair", "tip_icon": "img/whiteChair.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/4.glb" }] },
    { "category": "room", "name": "scene", "icon": "img/2.png", tip: [{ "tip_name": "scene", "tip_icon": "img/2.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/3.glb" }] },
    { "category": "kitchen", "name": "Sandalye", "icon": "img/2.png", tip: [{ "tip_name": "Sandalye", "tip_icon": "img/2.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/2.glb" }, { "tip_name": "scene", "tip_icon": "img/2.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/1.glb" }] },
    { "category": "kose", "name": "Sofa", "icon": "img/redSofa.png", tip: [{ "tip_name": "Sandalye", "tip_icon": "img/2.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/2.glb" }, { "tip_name": "scene", "tip_icon": "img/2.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/1.glb" }] },
    { "category": "child", "name": "Blue Armchair", "icon": "img/blueArmChair.png", tip: [{ "tip_name": "Blue Armchair", "tip_icon": "img/blueArmChair.png", "tip_link": "https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/1.glb", "tip_color": "#B2DDEF" }] }];
    this.classCh[0] = "active";
    this.categoryCh = "room";
  }
  onClick(item) {

    this.router.navigate(['detail', JSON.stringify(item)]);
  }
  logout() {
    this.router.navigate(['menu']);
  }

  changeCategory(item, category) {
    for (let i = 0; i < 5; i++) {
      if (i == item) {
        this.classCh[i] = "active";
        continue;
      }
      this.classCh[i] = "";
    }
    this.categoryCh = category;
  }
}
