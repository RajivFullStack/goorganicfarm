import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {HttpServices} from '../../app/services/http.services';
import { Toast } from 'ionic-native';

import { CheckoutPage} from '../../pages/checkout/checkout';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  Item :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices:HttpServices,private loadingCtrl: LoadingController) {

      this.Item = navParams.get('item');
      console.log(this.Item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  isNumberKey(evt)
       {
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
       }

  removeItem(data){
     let loadingPopup = this.loadingCtrl.create({
      content: 'Removing from Cart...'
    });
    // Show the popup
    loadingPopup.present();
    this.httpServices.POST("SalesOrder/DeleteSalesOrder?id="+data.SalesOrder_SalesOrderId,{}).subscribe(response=>{
      console.log(response);
      var index = this.Item.ListGroupSalesOrder.indexOf(data);
  // console.log(index);
      this.Item.ListGroupSalesOrder.splice(index, 1); 
       loadingPopup.dismiss();
     // alert("Item Removed to Cart!!!");
    },error=>{
      loadingPopup.dismiss();
      console.log(error);
      alert("Error!!!");
    })
  }
 

updateItem(data,userid){
  //console.log(data);
  var arr=[];

     let loadingPopup = this.loadingCtrl.create({
      content: 'Updating Cart...'
    });
    // Show the popup
    loadingPopup.present();
    arr.push(data);
    var jsonData={"SalesOrder_UserId": userid, ListGroupSalesOrder:arr};
    console.log(jsonData);
    this.httpServices.POST("SalesOrder/UpdateSalesOrderList",jsonData).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();
       Toast.show("Cart Updated !!!", '5000', 'center').subscribe(
      toast => {
       // console.log(toast);
      });
     // alert("Item Removed to Cart!!!");
    },error=>{
      loadingPopup.dismiss();
      Toast.show(error.Message, '5000', 'center').subscribe(
      toast => {
       // console.log(toast);
      });
    })
  }

  ConfirmCheckOut(item){
    console.log('Cart Page : ');
    console.log(item);
    this.navCtrl.push(CheckoutPage, {
      item: item
    });
  }
}
