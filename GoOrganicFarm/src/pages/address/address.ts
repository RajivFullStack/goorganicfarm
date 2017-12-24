import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpServices} from '../../app/services/http.services';
import { AddEditAddressPage} from '../../pages/add-edit-address/add-edit-address';


/*
  Generated class for the Address page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-address',
  templateUrl: 'address.html'
})
export class AddressPage {
UserID :string;
AddressList :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices: HttpServices, 
  private loadingCtrl: LoadingController,private storage :Storage) {
    
   
     this.storage.get('UserProfile').then((val) => {  
        let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Address...'
    });
      //this.UserName=val.UserName;
      if(val !=null){ 
       let profile=JSON.parse(val);
     
      loadingPopup.present();
      this.UserID=profile.UserID;
        
      this.httpServices.GET("UserAddress/GetUserAddressByUserID?id="+this.UserID).subscribe(res=>{

         this.AddressList=res;//ListGroupSalesOrder
        // console.log(res);
          loadingPopup.dismiss();
       });

      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  AddNewAddress(){
     this.navCtrl.push(AddEditAddressPage, {
     // item: item
    });
  }
  EditAddress(item){
    this.navCtrl.push(AddEditAddressPage, {
      item: item
    });
  }
  DeleteAddress(item){

  }


}
