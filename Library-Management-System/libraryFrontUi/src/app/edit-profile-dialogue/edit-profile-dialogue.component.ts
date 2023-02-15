import { Component,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-edit-profile-dialogue',
  templateUrl: './edit-profile-dialogue.component.html',
  styleUrls: ['./edit-profile-dialogue.component.css']
})
export class EditProfileDialogueComponent {

  profileEditForm = this.fb.group({
    studentId : [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: [''],
  })

  constructor(private fb: FormBuilder, 
    private _snackBar: MatSnackBar, 
    private userService: UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data:any 
  ) { }

  ngOnInit():void {

    this.studentId?.setValue(this.data.studentId)
    this.name?.setValue(this.data.name);
    this.email?.setValue(this.data.email);
    this.phone?.setValue(this.data.phone);
    this.password?.setValue(this.data.password);
  }

  get studentId() { return this.profileEditForm.get("studentId") };
  get name() { return this.profileEditForm.get("name") };
  get phone() { return this.profileEditForm.get("phone") };
  get email() { return this.profileEditForm.get("email") };
  get password() { return this.profileEditForm.get("password") };

  userDetails: any = this.profileEditForm.value;
}
