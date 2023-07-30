import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, setDoc, query, where, getDocs } from '@angular/fire/firestore';

import { Auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  user !: string;


  

  constructor( private firestore: Firestore, private auth: Auth) { 
  }

  addsite(data: Object){
    
    const dbInstance = collection(this.firestore, 'users' ,this.user, 'sites');

    return addDoc(dbInstance, data);
  }

  loadSites(){
    const dbInstance = collection(this.firestore, 'users', this.user,'sites');
    return collectionData(dbInstance, {idField: 'id'});
  }

  updateSite(id: string, data: object){
    const docInstance = doc(this.firestore, 'users',this.user, 'sites', id );
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string){
    const docInstance = doc(this.firestore,'users', this.user,'sites', id);
    return deleteDoc(docInstance);
  }

  //password component query
  async checkIfExistsByEmail (email: string, db: any) {
    const q = query(db, where("email", "==", email));
    const emailSnapshot = await getDocs(q);
    return !emailSnapshot.empty;
  }

  async checkIfExistsByUsername(username: string, db: any) {
    const q = query(db, where("username", "==", username));
    const usernameSnapshot = await getDocs(q);
    return !usernameSnapshot.empty;
  }

  async checkinguserExist(username: string, email: string, db: any){
    try {
      const [emailExists, usernameExists] = await Promise.all([
        this.checkIfExistsByEmail(email, db),
        this.checkIfExistsByUsername(username, db),
      ]);
  
      if (emailExists || usernameExists) {
        return false
      } else {
        return true
      }
    } catch {
      return false
    }
  }

  async addPassword(data: any, siteId: string) {
    const dbInstance = collection(this.firestore, 'users',this.user, 'sites', siteId, 'passwords');

    const checkuser =  await this.checkinguserExist(data.username, data.email, dbInstance)
    if(checkuser){
      return addDoc(dbInstance, data)
    }

    return
    
  }

  loadPasswords(siteId: string){
    const dbInstance = collection(this.firestore, 'users', this.user, 'sites', siteId, 'passwords');
    return collectionData(dbInstance, {idField: 'id'});
  }

  async updatePassword(data: any, siteId: string, accountId: string){
    const docInstance = doc(this.firestore, 'users',this.user, 'sites', siteId, 'passwords', accountId );
    const checkuser =  await this.checkinguserExist(data.username, data.email, collection(this.firestore, 'users',this.user, 'sites', siteId, 'passwords'))
    if(checkuser){
      return updateDoc(docInstance, data);
    }
  }

  daletePassword(siteId: string, accountId: string){
    const docInstance = doc(this.firestore, 'users' ,this.user, 'sites', siteId, 'passwords', accountId);
    return deleteDoc(docInstance);
  }

  //login
  login(email: string, password: string){
    this.user = email;
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  createNewUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);

  }

  createNewUserDoc(email: string){
    return setDoc(doc(this.firestore, 'users', email), {email : email})
  }

  //logout
  logout(){
    this.user = '';
    return signOut(this.auth);
  }

  

}
