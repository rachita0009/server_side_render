import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HearderComponent } from './hearder/hearder.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DummyComponent } from './dummy/dummy.component';
import {MatSortModule} from '@angular/material/sort';

import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HearderComponent,
    FooterComponent,
    SliderComponent,
    ForgotpasswordComponent,
    EditprofileComponent,
    UsersComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
