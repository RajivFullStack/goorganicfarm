import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ViewController } from 'ionic-angular';
import {HttpServices} from '../../app/services/http.services';
import { Toast } from 'ionic-native';

/*
  Generated class for the MyorderDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myorder-detail',
  templateUrl: 'myorder-detail.html'
})
export class MyorderDetailPage {
 Item :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices: HttpServices, 
  private loadingCtrl: LoadingController,  private viewCtrl : ViewController) {
    this.Item = navParams.get('item');
    console.log(this.Item);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderDetailPage');
  }

dismiss() {
   let data = this.Item;
   console.log('closing');
   this.viewCtrl.dismiss(data);
 }

 cancelOrder(cancelItem){

  console.log(cancelItem);
  let loadingPopup = this.loadingCtrl.create({
      content: 'Cancelling order...'
    });
    loadingPopup.present();
    this.httpServices.POST("SalesOrder/UpdateSalesOrderStatus?SalesOrderID="+cancelItem.SalesOrderID+"&status=CANCEL","").subscribe(response=>{
      //console.log(response);
       loadingPopup.dismiss();

      Toast.show("Order Cancelled Successfully!!!", '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      });
    },err=>{
      console.log(err);
      alert('Error in cancelling !');
    });
 }

 
}
