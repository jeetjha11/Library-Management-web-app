import { Component } from '@angular/core';
import { UserServiceService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn:boolean = false;
  title = 'libraryFrontUi';
  constructor(private userService:UserServiceService){}
  ngOnInit():void {
    this.userService.isLoggedIn.subscribe(data=> this.isLoggedIn = data)
  }

}
