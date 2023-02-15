import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddBookComponent } from './add-book/add-book.component';
import {DialogModule} from '@angular/cdk/dialog';
import { EditBookComponent } from './edit-book/edit-book.component';
import { IssuedBookComponent } from './issued-book/issued-book.component';
import { SearchDialogueComponent } from './search-dialogue/search-dialogue.component';
import { SearchDialogueByAuthorComponent } from './search-dialogue-by-author/search-dialogue-by-author.component';
import { SearchDialogueGenreComponent } from './search-dialogue-genre/search-dialogue-genre.component';
import { AdminDisplayComponent } from './admin-display/admin-display.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileDialogueComponent } from './edit-profile-dialogue/edit-profile-dialogue.component';
import { ErrorComponentComponent } from './error-component/error-component.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserLandingComponent,
    AdminLandingComponent,
    NavbarComponent,
    AddBookComponent,EditBookComponent,IssuedBookComponent,SearchDialogueComponent,SearchDialogueByAuthorComponent,
    SearchDialogueGenreComponent,
    AdminDisplayComponent,
    ErrorComponentComponent,
    EditProfileDialogueComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    HttpClientModule,
    MatCardModule,
    DragDropModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    DialogModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
