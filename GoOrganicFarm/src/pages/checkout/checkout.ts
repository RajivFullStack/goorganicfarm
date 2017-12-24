import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Toast } from 'ionic-native';

import {HttpServices} from '../../app/services/http.services';
import { Product} from '../../pages/product/product';
/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
Item :any;
AddressList : any;
PaymentFormList : any;
UserID : string;
DeliveryAddressID : string;
PaymentFormID : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices: HttpServices, 
  private loadingCtrl: LoadingController,private storage :Storage, private viewCtrl : ViewController) {

     
     this.Item = navParams.get('item');
      console.log(this.Item);
      //Calling Address list
       this.storage.get('UserProfile').then((val) => {  
        let loadingPopup = this.loadingCtrl.create({
        content: 'Please Wait...'
        });
      //this.UserName=val.UserName;
      if(val !=null){ 
        loadingPopup.present();
       let profile=JSON.parse(val);
      this.UserID=profile.UserID;
      this.httpServices.GET("UserAddress/GetUserAddressByUserID?id="+this.UserID).subscribe(res=>{

         this.AddressList=res;//ListGroupSalesOrder
        // console.log(res);
          loadingPopup.dismiss();
       });

       this.httpServices.GET("PaymentForm/GetPaymentFormList").subscribe(res=>{

         this.PaymentFormList=res;//ListGroupSalesOrder
        // console.log(res);
          loadingPopup.dismiss();
       });

      }
    });   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

PaymentFormChanged(paymentFormID){
//this.PaymentFormID=paymentFormID;
}
AddressChanged(addressID){
  //this.DeliveryAddressID=addressID;
}
PlaceOrder(item){
  var GrossAmount=0;
  console.log('Payment Form ID : '+this.PaymentFormID);
  console.log('Address ID : '+this.DeliveryAddressID);
   item.SalesOrder_DeliveryAddresID=this.DeliveryAddressID;
   item.SalesOrder_PaymentFormID=this.PaymentFormID;
   item.SalesOrderStatus="Confirm";
   item.GroupSalesOrderStatus="Confirm";
   for(let i=0;i<item.ListGroupSalesOrder.length;i++){
        item.ListGroupSalesOrder[i].SalesOrderStatus="Confirm";
        GrossAmount+=(item.ListGroupSalesOrder[i].SalesOrder_ProductCost*item.ListGroupSalesOrder[i].SalesOrder_ProductQuantity);
   }
  item.GroupSalesOrderDiscountAmount=0;
  item.GroupSalesOrderTaxAmount=0;
  item.GroupSalesOrderGrossAmount=GrossAmount;
  console.log(item);


let loadingPopup = this.loadingCtrl.create({
      content: 'Placing order...'
    });
    // Show the popup
    loadingPopup.present();
    this.httpServices.POST("SalesOrder/UpdateSalesOrderListForCheckOut",item).subscribe(response=>{
      //console.log(response);
       loadingPopup.dismiss();

      Toast.show("Order Placed Successfully!!!", '5000', 'center').subscribe(
      toast => {
        //console.log(toast);
      });
    
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
        this.navCtrl.setRoot(Product);

    },error=>{
      loadingPopup.dismiss();
      alert("Error!!!");
    })
}
  

}
