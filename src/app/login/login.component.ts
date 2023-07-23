import { Component, HostListener } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { MD5 } from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  onsignup : boolean = this.router.url == '/signup';

  constructor(private passwordManagerService: PasswordManagerService, 
    private router: Router){}

  onSubmit(value: any){

    if(!this.onsignup){
      this.passwordManagerService.login(value.email, value.password)
    .then(() => { 
      localStorage
      .setItem('passwordkey', MD5(`${value.email}${value.password}`).toString());
      this.router.navigate(['/site-list'])})
      .catch(err => { console.log(err)});
    }
    else{
      this.passwordManagerService.createNewUser(value.email, value.password)
      .then(()=>{
        this.router.navigate(['']);
      })
      .catch(() => {this.onSignUp();
      console.log('sign up failed')})
    }
    
  }

  onSignUp(){
    this.router.navigate(['/signup']);
  }


  


}
