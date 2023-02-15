import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private userService: UserServiceService, private router: Router) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
    password: ['', Validators.required]
  });

  get email() { return this.loginForm.get("email") }
  get password() { return this.loginForm.get("password") }

  ngOnInit(): void {
    
  }


  temp: any;
  responseData: any;

  onSubmit() {
    this.temp = this.loginForm.value;
    this.userService.loginUser(this.temp).subscribe({
      next : (response) => {
        this.responseData = response;
        console.log(this.responseData);
        
        this.userService.authToken.next(this.responseData.token);
        localStorage.setItem("jwt", this.responseData.token);
        localStorage.setItem("isLoggedIn", 'true');
        this.userService.isLoggedIn.next(true);
        localStorage.setItem("role", this.responseData.user_role);
        console.log(this.responseData.token.user_role);
        
        if(this.responseData.user_role==="Role_Admin")
        {
          this.router.navigateByUrl('/admin');
        }
        else
        {
          this.router.navigateByUrl('/user');
        }
      },
      error : (err) => {
        let error;
        if(err.status == 404 ) {
          error = "Login Failed! Please Check The Credentials Again!"
        }else {
          error = "Could not Login! Please Try After Some Time"
        }
        this._snackBar.open(error,"Close", {
          duration : 3000
        })
      }
    },
    );
  }



}
