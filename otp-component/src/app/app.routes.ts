import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {HomeComponent} from "./home/home.component"; // CLI imports router
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  { path: '', component: OtpComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
