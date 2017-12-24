import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { Storage, SqlStorage } from 'ionic-framework/ionic';

import { RegisterPage} from '../../pages/register/register'; // For redirecting another page
import { Product } from '../../pages/product/product';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';

import {HttpServices} from '../../app/services/http.services';
// import {CurrentUser} from '../../app/services/current.user';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html' 
  
})
export class LoginPage {
registerPage =RegisterPage; // For redirecting another page
 EmailID :string;
 Password: string;
 RememberMe :boolean;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpServices : HttpServices,
   private loadingCtrl: LoadingController, private storage :Storage) {
     
 
  }
//  ngOnInit(){
//   //  console.log('calling...');
//  }
  signIn(){
    
    if(this.EmailID ==null || this.EmailID==""){
      alert("Email ID is required");
      return;
    }
    if(this.Password ==null || this.Password==""){
      alert("Password is required");
      return;
    }
    let loadingPopup = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    // Show the popup
    loadingPopup.present();
    this.httpServices.GET_TOKEN(this.EmailID,this.Password).subscribe(response=>{
       console.log(response);
      loadingPopup.dismiss();
    
      if(response.userName!=null){
        this.httpServices.SET_TOKEN(response.access_token);
        this.storage.set('token',response.access_token);
        response.UserName=response.FirstName;
         response.Email=this.EmailID;
          response.Password=this.Password;
         console.log(response);
        let val = JSON.stringify(response);
        this.storage.set('UserProfile', val);
         
         this.navCtrl.setRoot(Product);
      }
      else{
          loadingPopup.dismiss();
        alert('Invalid User Name or Password !!');
      }

    },err=>{
      var errMsg=JSON.parse(err._body)
      console.log(errMsg);
        loadingPopup.dismiss();
       alert(errMsg.error_description);
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
openResetPasswordPage() {
    
    this.navCtrl.push(ResetPasswordPage);
}
}
