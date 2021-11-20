/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public items: any = [];
  public temp3d: any;
  public classCh: any = [];
  public categoryCh: string;
  searchKey = '';
  res = [];
  slidesOptions = {
    slidesPerView: 2,
  };

  constructor(public router: Router, private http: HttpClient) {
    this.items = [
      {
        id: 0,
        category: 'room',
        name: 'Red Sofa',
        icon: 'img/redSofa.png',
        tip: [
          {
            id: 13,
            tip_name: 'Red Sofa',
            tip_icon: 'img/redSofa.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/3.glb',
            tip_color: '#F3BDB3',
          },
          {
            id: 14,
            tip_name: 'Chair',
            tip_icon: 'img/whiteChair.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/4.glb',
          },
        ],
      },
      {
        id: 1,
        category: 'room',
        name: 'scene',
        icon: 'img/2.png',
        tip: [
          {
            id: 15,
            tip_name: 'scene',
            tip_icon: 'img/2.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/3.glb',
          },
        ],
      },
      {
        id: 2,
        category: 'kitchen',
        name: 'Sandalye',
        icon: 'img/2.png',
        tip: [
          {
            id: 16,
            tip_name: 'Sandalye',
            tip_icon: 'img/2.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/2.glb',
          },
          {
            id: 17,
            tip_name: 'scene',
            tip_icon: 'img/2.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/1.glb',
          },
        ],
      },
      {
        id: 3,
        category: 'kose',
        name: 'Sofa',
        icon: 'img/redSofa.png',
        tip: [
          {
            id: 18,
            tip_name: 'Sandalye',
            tip_icon: 'img/2.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/2.glb',
          },
          {
            id: 19,
            tip_name: 'scene',
            tip_icon: 'img/2.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/1.glb',
          },
        ],
      },
      {
        id: 4,
        category: 'child',
        name: 'Blue Armchair',
        icon: 'img/blueArmChair.png',
        tip: [
          {
            id: 20,
            tip_name: 'Blue Armchair',
            tip_icon: 'img/blueArmChair.png',
            tip_link:
              'https://raw.githubusercontent.com/MyktybekOmur/arweb/master/assets/1.glb',
            tip_color: '#B2DDEF',
          },
        ],
      },
    ];
    this.classCh[0] = 'active';
    this.categoryCh = '';
  }
  onClick(item) {
    this.router.navigate(['detail', JSON.stringify(item)]);
  }
  logout() {
    this.router.navigate(['menu']);
  }
  // chanhe category tap
  changeCategory(item, category) {
    for (let i = 0; i < 6; i++) {
      if (i === item) {
        this.classCh[i] = 'active';
        continue;
      }
      this.classCh[i] = '';
    }
    this.categoryCh = category;
  }
  //search
  search() {
    this.classCh[0] = 'active';
    this.res = this.items.filter((item) => {
      if (item.name.includes(this.searchKey)) {
        return item;
      }
    });
  }
}
