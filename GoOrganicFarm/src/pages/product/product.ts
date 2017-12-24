import { Component } from '@angular/core';
 import { Storage } from '@ionic/storage';
 
import { NavController, NavParams , LoadingController} from 'ionic-angular';
import { ProductDetailsPage} from '../../pages/product-details/product-details';
import { CartPage} from '../../pages/cart/cart';

import {HttpServices} from '../../app/services/http.services';
import {UserServices} from '../../app/services/user.services';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  providers :[UserServices]
})
export class Product {

term :string='';
UserID :string;
CartList :any;
ListGroupSalesOrder :any;
selectedItem: any;
icons: string[];
items: any;//Array<{title: string, note: string, icon: string}>;
searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpServices: HttpServices, 
  private loadingCtrl: LoadingController,private storage :Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
     this.storage.get('UserProfile').then((val) => {  
      //this.UserName=val.UserName;
      if(val !=null){ 
       let profile=JSON.parse(val);
     
      
      this.UserID=profile.UserID;

      this.httpServices.GET("SalesOrder/GetSalesOrderListForCheckOut?userID="+this.UserID).subscribe(res=>{

         this.CartList=res;//ListGroupSalesOrder
        // console.log(res);
         this.ListGroupSalesOrder=res.ListGroupSalesOrder;
       });

      }
    });
    
    
    this.items = [];
     
     let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Products...'
    });
    // Show the popup
    loadingPopup.present();
    this.httpServices.GET("Product/GetProductList").subscribe(response=>{
     // console.log(response);
      this.items=response;

        loadingPopup.dismiss();
    },err=>{
      loadingPopup.dismiss();
      console.log(err);
      //var msg=JSON.parse(err.Response._body);
       //alert(msg.Message);
    });
 
  }
searchFn(ev: any) {
    this.term = ev.target.value;
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ProductDetailsPage, {
      item: item
    });
  }
OpenCart() {
    // That's right, we're pushing to ourselves!
     if(this.CartList != undefined || this.CartList !=null){
    this.navCtrl.push(CartPage, {
      item: this.CartList
    });
}
else{
  alert('Your Cart is empty!!!');
}

}

 getItems(ev: any) {
    // Reset items back to all of the items
     
 
    // set val to the value of the searchbar
    // let val = ev.target.value;

    // // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }


}
