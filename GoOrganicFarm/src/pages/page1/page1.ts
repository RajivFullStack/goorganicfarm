import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, LoadingController } from 'ionic-angular';

import {HttpServices} from '../../app/services/http.services';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
EmailID :string;
 Password: string;
 ConfirmPassword : string;
 PhoneNumber:string;
 FirstName:string;
 LastName:string;
 UserID:string;
 pin:number;
 UserList:any;
  constructor(public navCtrl: NavController,private httpServices:HttpServices,private loadingCtrl: LoadingController,
  private storage :Storage) {
    this.storage.get('UserProfile').then((val) => {  
      //this.FirstName=val.FirstName;
      if(val !=null){ 
       let profile=JSON.parse(val);
        let loadingPopup = this.loadingCtrl.create({
        content: 'Loading Profile...'
        });
        loadingPopup.present();
       
      this.UserID=profile.UserID;
      this.httpServices.GET("User/GetUser?id="+this.UserID).subscribe(res=>{

         //ListGroupSalesOrder
         console.log(res);
          this.EmailID=res.Email;
          this.FirstName=profile.FirstName;
          this.LastName=profile.LastName;
          this.UserID=res.UserID;
           
          this.PhoneNumber=res.PhoneNumber;
          this.pin=res.pin;
          loadingPopup.dismiss();
       });
     
      }
    });
  }

  UpdateProfile(){
    if(this.FirstName ==null || this.FirstName ==""){
      alert('First Name Required');
      return;
    }
    if(this.EmailID ==null || this.EmailID ==""){
      alert('Email Required');
      return;
    }
    
   
    if(this.PhoneNumber ==null || this.PhoneNumber ==""){
      alert('PhoneNumber Required');
      return;
    }
     let loadingPopup = this.loadingCtrl.create({
      content: 'Updating...'
    });
    // Show the popup
    loadingPopup.present();
    console.log(this.pin);
    this.httpServices.POST("User/UpdateUser",{"UserID": this.UserID,"FirstName":this.FirstName,"LastName":this.LastName,"Email":this.EmailID,"PhoneNumber":this.PhoneNumber,"pin":this.pin}).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();
      alert("User Updated Successfully");
    },err=>{
       loadingPopup.dismiss();
       console.log(err);
      alert("Error in update !!!");
    })
  }

}
