import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';

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

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService){
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteUrlImg = val.siteImgUrl
    });
  }
  passwordViewToggle(){
    this.showPassword = !this.showPassword;
  }

  onSubmit(values: object){
    this.passwordManagerService.addPassword(values, this.siteId)
    .then(() => { console.log("password is saved ")})
    .catch(() => { console.log("goblok lo")});
  }
}
