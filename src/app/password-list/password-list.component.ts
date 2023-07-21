import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  showPassword: boolean = false;
  siteName !: string;
  siteUrl !: string;
  siteUrlImg !: string;
  siteId !: string;


  /*Account information*/
  accountEmail !: string;
  accountUsername !: string;
  accountPassword !: string;
  accountId !: string;

  /*switch edit and add*/
  formState : string = "Add New";

  switchToAddUser(){
    this.formState = "Add New";

    this.accountEmail = '';
    this.accountUsername = '';
    this.accountPassword = '';
    this.accountId = '';
  }

  passwordList !: Observable<Array<any>>;

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService){
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteUrlImg = val.siteImgUrl
    });

    this.loadPasswords();
  }
  passwordViewToggle(){
    this.showPassword = !this.showPassword;
  }

  onSubmit(values: object){
    if(this.formState == "Add New"){
      this.passwordManagerService.addPassword(values, this.siteId)
      .then(() =>{ })
      .catch((err) => { console.log(err)});
    }
    else if(this.formState == "Edit"){
      this.passwordManagerService.updatePassword(values, this.siteId, this.accountId)
      .then(() => { this.switchToAddUser()})
      .catch(err => { console.log(err)});
    }
  }

  loadPasswords(){
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId)
  }

  editPassword(email: string, username: string, password: string, passwordId: string){
    this.accountId = passwordId;
    this.accountEmail = email;
    this.accountUsername = username;
    this.accountPassword = password;

    this.formState = "Edit";
  }

  deletePassword(accountId: string){
    this.passwordManagerService.daletePassword(this.siteId, accountId)
  }

  encryptPassword(password: string){
    const secretKey = "Xa5SDO6ujy";
    return AES.encrypt(password, secretKey).toString();
  }

  decryptPassword(password: string){
    const secretKey = "Xa5SDO6ujy";
    return AES.decrypt(password, secretKey).toString(enc.Utf8);
  }
}
