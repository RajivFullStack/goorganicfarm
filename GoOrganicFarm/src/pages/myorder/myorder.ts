import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ModalController } from 'ionic-angular';
import {HttpServices} from '../../app/services/http.services';
import { Toast } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { MyorderDetailPage} from '../../pages/myorder-detail/myorder-detail';
/*
  Generated class for the Myorder page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html'
})
export class MyorderPage {
 UserID:string;
 OrderList :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices: HttpServices, 
  private loadingCtrl: LoadingController,private storage :Storage,public modalCtrl: ModalController) {


    this.storage.get('UserProfile').then((val) => {  
        let loadingPopup = this.loadingCtrl.create({
        content: 'Loading Orders...'
        });
      //this.UserName=val.UserName;
      if(val !=null){ 
        loadingPopup.present();
       let profile=JSON.parse(val);
      this.UserID=profile.UserID;
      this.httpServices.GET("SalesOrder/GetSalesOrderList?userID="+this.UserID).subscribe(res=>{
        
       // console.log(res[0].ListGroupSalesOrder[0]);
         this.OrderList=res//ListGroupSalesOrder
         console.log(this.OrderList);
        //console.log(res[0]);
          loadingPopup.dismiss();
       },err=>{
         loadingPopup.dismiss();
         //alert('No Order Found !!!');
       });

      

      }
    });
  }

presentDateRangeModal(item) {
   let dateRangeModal = this.modalCtrl.create(MyorderDetailPage, {item :item.ListGroupSalesOrder});
   dateRangeModal.onDidDismiss(data => {
     console.log(data);
    // this.DateRange=data;
   });
   dateRangeModal.present();
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderPage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
     this.presentDateRangeModal(item);
  }

}
