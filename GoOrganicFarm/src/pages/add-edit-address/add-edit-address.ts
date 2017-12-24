import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Toast } from 'ionic-native';
import { AddressPage} from '../../pages/address/address';
import { NavController, LoadingController,NavParams,ViewController } from 'ionic-angular';

import {HttpServices} from '../../app/services/http.services';
/*
  Generated class for the AddEditAddress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-edit-address',
  templateUrl: 'add-edit-address.html'
})
export class AddEditAddressPage {

  AddressLine1 :string;
 AddressLine2: string;
 AddressCity : string;
 AddressZip:string;
 AddressMobileNumber:string;
 AddressCountry:string="India";
 AddressLandMark:string;
 AddressISDefault :boolean;
 UserID :string;
 Address_UserID :string;
 AddressID :string;
 Item :any;
 UpdateOrCreate:string="Create";
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices:HttpServices,private loadingCtrl: LoadingController,
  private storage :Storage, private viewCtrl : ViewController) {

 this.Item = navParams.get('item');
  if(this.Item != undefined || this.Item!=null){
      this.AddressLine1=this.Item.AddressLine1;
      this.AddressLine2=this.Item.AddressLine2;
      this.AddressCity=this.Item.AddressCity;
      this.AddressZip= this.Item.AddressZip;
      this.AddressMobileNumber= this.Item.AddressMobileNumber;
      this.AddressCountry= this.Item.AddressCountry;
      this.AddressLandMark= this.Item.AddressLandMark;
      this.Address_UserID=this.Item.Address_UserID;
      this.AddressISDefault= this.Item.AddressISDefault;
      this.AddressID=this.Item.AddressID;
      this.UpdateOrCreate="Update";
  }

this.storage.get('UserProfile').then((val) => {  
      //this.UserName=val.UserName;
      if(val !=null){ 
       let profile=JSON.parse(val);
      this.UserID=profile.UserID;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditAddressPage');
  }
 
 

 Save(){
    if(this.AddressLine1 ==null || this.AddressLine1 ==""){
      alert('AddressLine1 Required');
      return;
    }
    if(this.AddressLine2 ==null || this.AddressLine2 ==""){
      alert('AddressLine2 Required');
      return;
    }
    
    if(this.AddressZip ==null || this.AddressZip ==""){
      alert('Zip Required');
      return;
    }
     if(this.AddressCity ==null || this.AddressCity ==""){
      alert('Mobile Number Required');
      return;
    }
    if(this.AddressMobileNumber ==null || this.AddressMobileNumber ==""){
      alert('Mobile Number Required');
      return;
    }
    if(this.AddressMobileNumber.length !=10){
      alert('Mobile Number Not Valid');
      return;
    }
     if(this.AddressCountry ==null || this.AddressCountry ==""){
      alert('Country Required');
      return;
    }
   var myJson={
      
      "AddressLine1": this.AddressLine1,
      "AddressLine2": this.AddressLine2,
      "AddressCity": this.AddressCity,
      "AddressZip": this.AddressZip,
      "AddressMobileNumber": this.AddressMobileNumber,
      "AddressCountry": this.AddressCountry,
      "AddressLandMark": this.AddressLandMark,
      "Address_UserID": this.UserID,
      "AddressISDefault": this.AddressISDefault,
      "AddressID" : this.AddressID,
   }
   if(this.UpdateOrCreate=="Create"){
     console.log(myJson);
   let loadingPopup = this.loadingCtrl.create({
      content: 'Adding Address...'
    });
    // Show the popup
    loadingPopup.present();
    this.httpServices.POST("UserAddress/CreateAddress",myJson).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();
      Toast.show("Address Added !!!", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      });
    
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
        this.navCtrl.setRoot(AddressPage);
    })
  }
  else{
    let loadingPopup = this.loadingCtrl.create({
      content: 'Updating Address...'
    });
    loadingPopup.present();
    this.httpServices.POST("UserAddress/UpdateAddress",myJson).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();
      Toast.show("Address Updated !!!", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      });
    
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
        this.navCtrl.setRoot(AddressPage);
    })
  }
 }
 }

