import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth ,createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor( private firestore: Firestore) { 
  }

  addsite(data: Object){
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites(){
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, {idField: 'id'});
  }

  updateSite(id: string, data: object){
    const docInstance = doc(this.firestore, 'sites', id );
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string){
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  //password component query
  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, 'sites', siteId, 'passwords');
    return addDoc(dbInstance, data)
  }

  loadPasswords(siteId: string){
    const dbInstance = collection(this.firestore, 'sites', siteId, 'passwords');
    return collectionData(dbInstance, {idField: 'id'});
  }


}
