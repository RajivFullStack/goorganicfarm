import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the ProductDetailsDaterange page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-details-daterange',
  templateUrl: 'product-details-daterange.html'
})
export class ProductDetailsDaterangePage {
 Item :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.Item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsDaterangePage');
  }
dismiss() {
   let data = this.Item;
   console.log('closing');
   this.viewCtrl.dismiss(data);
 }
 remove(item){
   var index = this.Item.indexOf(item);
   console.log(index);
  this.Item.splice(index, 1);    
   console.log('deleted');
 }
}
