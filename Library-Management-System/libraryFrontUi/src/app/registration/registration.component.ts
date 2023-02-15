import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ErrorComponentComponent } from '../error-component/error-component.component';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  [x: string]: any;

  constructor(private fb: FormBuilder, 
    private _snackBar: MatSnackBar,
    private userService: 
    UserServiceService, 
    private router: Router,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
  }
  

  registrationForm = this.fb.group
    ({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
      phone: ['', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: [this.mustMatchValidator] });

  get name() { return this.registrationForm.get("userName") };
  get phone() { return this.registrationForm.get("phoneNumber") };
  get email() { return this.registrationForm.get("email") };
  get password() { return this.registrationForm.get("password") };
  get confirmPassword() { return this.registrationForm.get("confirmPassword") };

  mustMatchValidator(fg: AbstractControl) {
    const passwordValue = fg.get("password")?.value;
    const confirmPasswordValue = fg.get("confirmPassword")?.value;
    if (!passwordValue || !confirmPasswordValue) {
      return null;
    }
    if (passwordValue != confirmPasswordValue) {
      console.log("Inside");
      fg.get('confirmPassword')?.setErrors({ mustMatchError: true });
      return { mustMatchError: true }
    }
    return null;
  }

  responseData: any;
  temp: any;

  sendRegisterData() {
    console.log(this.registrationForm.value);
    this.temp = this.registrationForm.value;
    delete this.temp.confirmPassword;
    this.userService.registerUser(this.temp).subscribe({
      next: (response) => {
        console.log(response);
        this.userService.loginUser(this.temp).subscribe( {
          next :  (response) => {
            this.responseData = response;
            localStorage.setItem("jwt", this.responseData.token);
            console.log(localStorage.getItem('jwt'));
            
            this._snackBar.open("Account Created Successfully", "Okay");
            localStorage.setItem("isLoggedIn", 'true');
            console.log(localStorage.getItem('isLoggedIn'));
            this.userService.isLoggedIn.next(true);
            this.userService.authToken.next(this.responseData.token);
            if(this.responseData.role==="Role_Admin")
            {
              this.router.navigateByUrl('/admin');
            }
            else
            {
              this.router.navigateByUrl('/user');
            }
            
            
          },
          error : (err) => {
            console.log(err);
          }
        }

        )
      },
      error : (err) => {
        let error;
        if(err.status == 409 ) {
          error = "User Already Exists! Please Login"
        }else {
          error = "Could not Register! Please Try After Some Time"
        }
        this._snackBar.open(error,"Close", {
          duration : 3000
        })
      }
    }
    )
    
  }

  check() {
    console.log(this.registrationForm.errors);
  }


  async onExit()
  {
    if (this.registrationForm.dirty && this.registrationForm.invalid) {
      let response = await this.openDialog();
      console.log(response);
      return response;
    }
    else
      return true;

  }




  async openDialog(): Promise<any> {
    const dialogRef = this.dialog.open(ErrorComponentComponent, {
      data: "Are you sure?"
    });

    const source$ = dialogRef.afterClosed();
    const userResp = await lastValueFrom(source$);
    console.log("Using LastValue", userResp);

    return userResp ? true : false;
  }


}
