import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, FieldValue, Firestore, increment, query, updateDoc, where } from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadString,Storage } from '@angular/fire/storage';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private firestore: Firestore, private storage: Storage) { 

  }
  getProducts(){
    const userDocRef = collection(this.firestore, 'products');
    return collectionData(userDocRef, { idField: 'id' });
  }
  getPrd(cat:string):Observable<any> {
   
    const userDocRef = collection(this.firestore, 'products');
    const q =  query(userDocRef, where("category", "==", cat));
    return collectionData(q, { idField: 'id' });
  }
  async addProduct(body:any,img:any){

    try {
      try {

        const userDocRef = collection(this.firestore, `products`);
        const id = await (await addDoc(userDocRef, body)).id;
        setTimeout(()=>{
          this.uploadImage(id,img);
          this.updateCategory(body.categoryId);
        },1000)
      
        return true;
      } catch (e) {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  async updateProduct(id1:string,body:any,img:any,imgUpdate:boolean){

    try {

        const userDocRef1 = doc(this.firestore, `products/${id1}`);
        await updateDoc(userDocRef1, body);
        if(imgUpdate){
          setTimeout(()=>{
            this.uploadImage(id1,img);
          },1000)
        }      
        return true;
  
    } catch (e) {
      return null;
    }
  }
  async uploadImage(id: any,img:any) {
    const path = `product/product.png`;
    const storageRef = ref(this.storage, path);
    try {
      await uploadString(storageRef, img.split(',')[1], 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `products/${id}`);
      await updateDoc(userDocRef,
        {imageUrl}
     );
      return true;
    } catch (e) {
      return null;
    }
  }
  deleteProduct(prd:any){
    const userDocRef = doc(this.firestore, `products/${prd.id}`);
    this.updateCategoryDe(prd.categoryId);
    return deleteDoc(userDocRef);
  }
  async updateCategory(id:string){

    try {
        const userDocRef1 = doc(this.firestore, `categories/${id}`);
        await updateDoc( userDocRef1, { count: increment(1) });    
        return true;
  
    } catch (e) {
      return null;
    }
  }
  async updateCategoryDe(id:string){
    
    try {
        const userDocRef1 = doc(this.firestore, `categories/${id}`);
        await updateDoc( userDocRef1, { count: increment(-1) });    
        return true;
  
    } catch (e) {
      return null;
    }
  }
}
