import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn:boolean = false;

  constructor(public dialog: MatDialog, private userService:UserServiceService, private router: Router){}

  ngOnInit():void {
    this.userService.isLoggedIn.subscribe(data=> this.isLoggedIn = data)
  }

  logout():void {
    this.userService.logout();
    this.router.navigateByUrl('');
  }

}
