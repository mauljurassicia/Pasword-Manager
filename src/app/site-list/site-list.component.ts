import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {

  allSites !: Observable<Array<any>>

  siteName !: string;
  siteUrl !: string;
  siteImgUrl !: string;
  siteId !: string;

  formState : string = "";

  constructor(private passwordManagerService: PasswordManagerService){
    this.loadSites();
  }

  onSubmit(values: object){
    console.log(values);
    this.passwordManagerService.addsite(values).then(() =>{console.log('Data saved successfully')})
    .catch((err) => { console.log(err)});
  }

  loadSites(){
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteUrl: string, siteImgUrl: string, id: string){
    this.siteName = siteName;
    this.siteUrl = siteUrl;
    this.siteImgUrl = siteImgUrl;
    this.siteId = id;
  }
}
