import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';

import {HttpServices} from '../../app/services/http.services';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
 EmailID :string;
 Password: string;
 ConfirmPassword : string;
 PhoneNo:string;
 FirstName:string;
 LastName:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private httpServices:HttpServices,private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  signUp(){
    if(this.FirstName ==null || this.FirstName ==""){
      alert('First Name Required');
      return;
    }
    if(this.EmailID ==null || this.EmailID ==""){
      alert('Email Required');
      return;
    }
    
    if(this.Password ==null || this.Password ==""){
      alert('Password Required');
      return;
    }
    if(this.ConfirmPassword ==null || this.ConfirmPassword ==""){
      alert('Confirm Password Required');
      return;
    }
    if(this.Password != this.ConfirmPassword){
      alert('New Password and Confirm Password does not match');
      return;
    }
    if(this.PhoneNo ==null || this.PhoneNo ==""){
      alert('PhoneNo Required');
      return;
    }
     let loadingPopup = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    // Show the popup
    loadingPopup.present();
    var json={     
          "Email": ""+this.EmailID,
          "Password": ""+this.Password, 
          "ConfirmPassword": ""+this.ConfirmPassword, 
          "PhoneNumber": ""+this.PhoneNo,
          "FirstName": ""+this.FirstName,
          "LastName": ""+this.LastName
        };
    
    
    this.httpServices.POSTWithoutToken("Account/Register",json).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();
      alert("User Created Successfully");
    },err=>{
      console.log(err._body);
      var displayMessage="";
      var errorString=JSON.stringify(err._body);
      if(errorString.indexOf("The Password must be at least 6 characters long") !== -1){
        displayMessage="The Password must be at least 6 characters long.";
      }
      else if(errorString.indexOf("is already taken") !== -1){
        displayMessage="The Email "+this.EmailID +" is already taken.";
      }
      else if(errorString.indexOf("Passwords must have at least one non letter or digit character. Passwords must have at least one lowercase (") !== -1){
        displayMessage="Passwords must have at least one non letter or digit character. Passwords must have at least one lowercase ('a'-'z').";
      }
      else if(errorString.indexOf("is invalid.") !== -1){
        displayMessage="The Email "+this.EmailID +" is invalid.";
      }
      
      loadingPopup.dismiss();
      alert(displayMessage);
      
     
    })
  }

}
