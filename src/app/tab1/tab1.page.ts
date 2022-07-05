/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public prds: any = [];
  public temp3d: any;
  public classCh: any = [];
  public categoryCh: string;
  searchKey = '';
  res = [];
  slidesOptions = {
    slidesPerView: 2,
  };
  cats:any;

  constructor(private prdApi:ProductService,private catApi: CategoryService,
    public router: Router,
    private http: HttpClient,
    private localdata: StorageService
  ) {
    
    this.classCh[0] = 'active';
    this.categoryCh = '';

  }
  ngOnInit() {
    this.getProducts();
   this.getCategories();
  }
  getPrdWithCat(cat:string){
    this.prdApi.getPrd(cat).subscribe(res=>{
      this.prds = res;
    })
  }
  getProducts(){
    this.prdApi.getProducts().subscribe(res=>{
      this.prds = res;
      console.log(res)
    })
  }
  getCategories(){
    this.catApi.getCategries().subscribe(res=>{
      this.cats = res;
      console.log(this.cats)
    })
  }
  
  onClick(item) {
    this.router.navigate(['detail', JSON.stringify(item)]);
  }
  logout() {
    this.router.navigate(['menu']);
  }
  // chanhe category tap
  changeCategory(item, category) {
    console.log(category);
    for (let i = 0; i < this.cats.length; i++) {
      if (i === item) {
        this.classCh[i] = 'active';
        continue;
      }
      this.classCh[i] = '';
    }
    if(category!=''){
      this.getPrdWithCat(category);
    }else{
      this.getProducts();
    }
    this.categoryCh = category;
  }
  //search
  search() {
    this.classCh[0] = 'active';
    this.res = this.prds.filter((item) => {
      if (item.name.includes(this.searchKey)) {
        return item;
      }
    });
  }
  //add local data
  async addItem(item) {
    await this.localdata.addData(item);
    this.localdata.presentToast('Başarılı eklendi!', 'success');
  }


}
