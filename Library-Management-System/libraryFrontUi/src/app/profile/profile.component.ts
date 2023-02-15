import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogueComponent } from '../edit-profile-dialogue/edit-profile-dialogue.component';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private fb:FormBuilder
  ) {}

  profilePicForm = this.fb.group({
    profile: ['']
  })
  get profile(){ return this.profilePicForm.get('profile')}

userDetails:any;

ngOnInit():void {
  this.viewProfile();   
}

viewProfile()
{
  this.userService.viewProfileOfUser().subscribe(response=>{
    this.userDetails=response
  })
}

  openDialog()
  {
    const dialogRef=this.dialog.open(EditProfileDialogueComponent,
      {
        data:this.userDetails
      });

      dialogRef.afterClosed().subscribe((result:any)=>
      {

        console.log(result);
        
        if(result!=null || result!=undefined)
        {
          this.userService.updateProfile(result).subscribe(response=>
            {
              this.userDetails=response;
            })
        }
      })






  }

  uploadPic(event:any)
  {
    const formData = new FormData();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profile?.setValue(file);
    }
    
    formData.append('multipartFile', this.profilePicForm.get('profile')?.value ?? '');
    this.userService.uploadProfilePic(formData).subscribe({
      next: data => {
        console.log(data);
        this.userDetails = data;
      }
    })
  }

}
