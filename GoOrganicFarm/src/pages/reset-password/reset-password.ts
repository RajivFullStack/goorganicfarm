import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Toast } from 'ionic-native';

import {HttpServices} from '../../app/services/http.services';

/*
  Generated class for the ResetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  UserID:string;
  EmailID:string;
  UserData :any;
  OTPValidated:boolean;
  UserOTP:string;
  NewPassword:string;
  ConfirmPassword:string;


  constructor(public navCtrl: NavController,private httpServices:HttpServices, public navParams: NavParams,private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
//SEND OTP 
  SendOTP(){
    if(this.EmailID ==null || this.EmailID ==""){
      alert("Email required !");
      return;
    }
    let loadingPopup = this.loadingCtrl.create({
      content: 'Sending OTP to your registered mobile...'
    });

     loadingPopup.present();
    //First Call -> Getting User details including OTP
     this.httpServices.GET("User/GetUserOTP?emailID="+this.EmailID).subscribe(res=>{
          console.log(res);
          this.UserData=res;
          this.UserID=this.UserData.UserID;
           
          //Second Call -> Sending OTP to user's registerd Mobile No.
    var OTPJson={
                "Destination": "+91"+this.UserData.PhoneNumber,
                "Subject": "Rest Password OTP",
                "Body": "Go Organic OTP to reset your password "+this.UserData.OTP
              };
     this.httpServices.POST("SMS/PostSMS",OTPJson).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();

      Toast.show("OTP Sent !", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      });

    },error=>{
      loadingPopup.dismiss();
      alert("Error!!!");
    })
  });
     
}
//VALIDATE OTP
validateOTP()
{
if(this.UserData.OTP ==this.UserOTP){
  this.OTPValidated=true;
}
else{
  this.OTPValidated=false;
alert('OTP does not match ! Please try again...')
}
}

//RESET PASSWORD
resetPassword(){
 if(this.NewPassword !=this.ConfirmPassword){
   alert('New Password and confirm password does not match !');
   return;
 }
//RESET PASSWORD HTTP CALL
let loadingPopup = this.loadingCtrl.create({
      content: 'Updating Password...'
    });

      loadingPopup.present();
      var jsonBody={
                  "NewPassword" :this.ConfirmPassword,
                  "UserID" : this.UserID,
                  "OTP" : this.UserOTP
      }

      this.httpServices.POST("User/ResetUserPassword",jsonBody).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();

      Toast.show("Password Reset Success !", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      });

    },error=>{
      loadingPopup.dismiss();
      alert("Error!!!");
    });
   

}

}//Class End
