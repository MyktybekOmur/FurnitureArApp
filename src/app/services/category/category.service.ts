import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { getDownloadURL, uploadString,Storage, ref } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private firestore: Firestore, private storage: Storage) { 

  }
  getCategries(){
    const userDocRef = collection(this.firestore, 'categories');
    return collectionData(userDocRef, { idField: 'id' });
  }
  async addCategory(body:any,img:any){
    try {
      try {

        const userDocRef = collection(this.firestore, `categories`);
        const id = await (await addDoc(userDocRef, body)).id;
        setTimeout(()=>{
          this.uploadImage(id,img);
        },1000)
      
        return true;
      } catch (e) {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  async updateCategory(id1:string,body:any,img:any,imgUpdate:boolean){

    try {

        const userDocRef1 = doc(this.firestore, `categories/${id1}`);
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
    const path = `uploads/profile.png`;
    const storageRef = ref(this.storage, path);
    try {
      await uploadString(storageRef, img.split(',')[1], 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `categories/${id}`);
      await updateDoc(userDocRef,
        {imageUrl}
     );
      return true;
    } catch (e) {
      return null;
    }
  }
  deleteCategory(id:string){
    const userDocRef = doc(this.firestore, `categories/${id}`);
    return deleteDoc(userDocRef);
  }

}
