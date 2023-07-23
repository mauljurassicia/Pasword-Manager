import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query } from '@angular/fire/firestore';

import { Auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {


  

  constructor( private firestore: Firestore, private auth: Auth) { 
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

  updatePassword(data: object, siteId: string, accountId: string){
    const docInstance = doc(this.firestore, 'sites', siteId, 'passwords', accountId );
    return updateDoc(docInstance, data);
  }

  daletePassword(siteId: string, accountId: string){
    const docInstance = doc(this.firestore, 'sites', siteId, 'passwords', accountId);
    return deleteDoc(docInstance);
  }

  //login
  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  createNewUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  //logout
  logout(){
    return signOut(this.auth);
  }

  

}
