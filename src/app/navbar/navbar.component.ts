import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private passwordManagerService: PasswordManagerService,
    private router: Router){
  }

  logout(){
    this.passwordManagerService.logout()
    .then(() => { localStorage.clear();
    this.router.navigate(['']);})
  }

}
