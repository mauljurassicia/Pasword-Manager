import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { map } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteForm: FormGroup;

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

  /*toggle between encrypt and decrypt*/


  switchToAddUser(){
    this.formState = "Add New";

    this.accountEmail = '';
    this.accountUsername = '';
    this.accountPassword = '';
    this.accountId = '';
  }

 

  passwordList !: Array<any>;

  constructor(private route: ActivatedRoute, 
    private passwordManagerService: PasswordManagerService,
    private clipboard: Clipboard, private formBuilder: FormBuilder){
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteUrlImg = val.siteImgUrl
    });

    this.loadPasswords();

    this.siteForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.siteForm.get('email');
  }

  get username() {
    return this.siteForm.get('username');
  }

  get password() {
    return this.siteForm.get('password');
  }

  passwordViewToggle(){
    this.showPassword = !this.showPassword;
  }

  onSubmit(values: any){

    values.password = this.encryptPassword(values.password);
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
    this.passwordManagerService.loadPasswords(this.siteId)
    .pipe(map(items=>{
      return items.map(item => ({...item, 
        toggleonDecrypt : true, passwordDecryptedtemp : "" }))
    })).subscribe(val =>
      {this.passwordList = val;})
  }

  editPassword(password: any){


    this.accountId = password.id;
    this.accountEmail = password.email;
    this.accountUsername = password.username;
    this.accountPassword = password.toggleonDecrypt ? password.passwordDecryptedtemp : password.password;

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

  onDecrypt(password: any){
    if(password.toggleonDecrypt){
      password.passwordDecryptedtemp = password.password;
      password.password = this.decryptPassword(password.password);
      password.toggleonDecrypt = false;
      this.clipboard.copy(password.password);
    }
    else{
      password.password = password.passwordDecryptedtemp;
      password.passwordDecryptedtemp = this.decryptPassword(password.password)
      password.toggleonDecrypt = true;
    }
    
  }

  

}
