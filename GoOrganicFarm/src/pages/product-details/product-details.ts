import { Component } from '@angular/core';
import { Toast } from 'ionic-native';
 import { Storage } from '@ionic/storage';

import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';

import { NavController, NavParams, ModalController,LoadingController,ViewController } from 'ionic-angular';
import { ProductDetailsDaterangePage} from '../../pages/product-details-daterange/product-details-daterange';
import { Product} from '../../pages/product/product';
import {HttpServices} from '../../app/services/http.services';
import {UserServices} from '../../app/services/user.services';
import * as moment from 'moment'


/*
  Generated class for the ProductDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
  providers :[UserServices]
})
export class ProductDetailsPage {
//Calendar
    eventSource;
    viewTitle;

    isToday:boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

///
Item: any;
DateRange:Array<any>=[];
SelectedPriceListCode : any;
DisplayPriceListCodeAndPrice :any;
ArrayPriceListAndCode : any;
TotalPrice :number;
OrderQuantity :number;
UnitPrice : number;
IsMultiDay :string;
FromDate :string=new Date().toISOString();
ToDate : string;
MinDate : string=new Date().toISOString();
MinDate2 : string=new Date().toISOString();
PriceListMinimumQuantity : number =1;
PriceList_UnitOfMeasureId :string;
PriceList_ProductConversionRuleId:string;
UserID :string;
pattern: any=/06([0-9]{8})/;
IsValidateQuantity : boolean=false;
//MaxDate : string =this.lastDayOfMonth.toISOString();


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
  private storage :Storage,private httpServices:HttpServices,private loadingCtrl: LoadingController,
  private viewCtrl : ViewController) {
    this.Item = navParams.get('item');
    this.TotalPrice=0;
    this.storage.get('UserProfile').then((val) => {  
      //this.UserName=val.UserName;
      if(val !=null){ 
       let profile=JSON.parse(val);
     // console.log(profile);
      this.UserID=profile.UserID;
      }
    });
    if(this.Item.IsMultiDaySalesAllowed){

    }
    console.log('User ID : '+this.UserID);
  }
presentDateRangeModal() {
   let dateRangeModal = this.modalCtrl.create(ProductDetailsDaterangePage, {item :this.DateRange});
   dateRangeModal.onDidDismiss(data => {
     console.log(data);
     this.DateRange=data;
   });
   dateRangeModal.present();
 }
 
 validate()
{
 if(this.TotalPrice==0){
   return true;
 }
 
 if(this.OrderQuantity== null || this.OrderQuantity==0){
   return true;
 }
  if(this.PriceListMinimumQuantity > this.OrderQuantity){
   return true;
 }
 if(this.IsMultiDay=="MultiDay")
 {
   if(this.ToDate==null || this.ToDate=="")
   return true;
 }
 if(this.OrderQuantity.toString().indexOf('.') !== -1 ){
 this.IsValidateQuantity=true;
   return true;
 }
 else {
    
   this.IsValidateQuantity=false;
 }

}

  
  ionViewDidLoad() {
   // console.log('ionViewDidLoad ProductDetailsPage');
  }
  OrderQuantity_Click(){
    //var temp=parseInt(this.OrderQuantity.toString().replace('.','')); 
     
   //this.OrderQuantity=temp;
  //this.OrderQuantity= parseInt((this.OrderQuantity.toString().split('.')[0]));
    this.TotalPrice=Number(this.OrderQuantity)*this.UnitPrice;

  }
  UOMChanged(PriceListMinimumQuantity,PriceList_UnitOfMeasureId,PriceList_ProductConversionRuleId){
     
    this.ArrayPriceListAndCode=this.SelectedPriceListCode.split("=");
    
    this.UnitPrice=Number(this.ArrayPriceListAndCode[1]);
    this.TotalPrice=Number(this.OrderQuantity)*this.UnitPrice;
    this.DisplayPriceListCodeAndPrice="1 "+this.ArrayPriceListAndCode[0]+" Price = "+this.ArrayPriceListAndCode[1]+ " INR";
    this.PriceListMinimumQuantity=PriceListMinimumQuantity;
    this.PriceList_UnitOfMeasureId=PriceList_UnitOfMeasureId;
    this.PriceList_ProductConversionRuleId=PriceList_ProductConversionRuleId;
  }
  

  FromDate_Click(){
    console.log(this.FromDate);
  }
    ToDate_Click(){
    this.DateRange=[];
    var a = moment(this.FromDate);//,'DD/MMM/YYYY');
    var b = moment(this.ToDate)//,'M/D/YYYY');
    var diffDays = b.diff(a, 'days');
    
    var tempFromDate=this.FromDate;
    console.log(diffDays);
    for(let i=1;i<=diffDays+2;i++){
      var dt=moment(tempFromDate).format("dddd DD/MMM/YYYY");
    //console.log(dt);
    this.DateRange.push({"OriginalDate":tempFromDate,"DateRange":dt});

      tempFromDate=moment(tempFromDate).add(1,'days').toISOString();
      
    //moment(this.FromDate).add(i,'days').format("dd"));
    }
    console.log(this.DateRange);
    this.presentDateRangeModal();
  }
  AddToCart(){
   
  var arrProduct=[];
    if(this.IsMultiDay=="MultiDay"){
      for(let i=0;i<this.DateRange.length;i++){

       // console.log(this.DateRange[i].OriginalDate);

        tmpJson={
                  "SalesOrder_ProductConversionRuleId": this.PriceList_ProductConversionRuleId,// Needs to modify
                  "SalesOrder_ProductQuantity": this.OrderQuantity,
                  "SalesOrder_ProductCost":this.TotalPrice,
                  "SalesOrder_Orderdate": moment(this.DateRange[i].OriginalDate).format("DD/MMM/YYYY")
                };
        arrProduct.push(tmpJson);
      }
      
    }
    else{
      var tmpJson={
                  "SalesOrder_ProductConversionRuleId": this.PriceList_ProductConversionRuleId,//// Needs to modify
                  "SalesOrder_ProductQuantity": this.OrderQuantity,
                  "SalesOrder_ProductCost":this.TotalPrice,
                  "SalesOrder_Orderdate": moment(this.FromDate).format("DD/MMM/YYYY")
                };
        arrProduct.push(tmpJson);

    }
  var FinalJson={"SalesOrder_UserId":this.UserID,"ListGroupSalesOrder":arrProduct};

  console.log(FinalJson);
   
   let loadingPopup = this.loadingCtrl.create({
      content: 'Adding to Cart...'
    });
    // Show the popup
    loadingPopup.present();
    this.httpServices.POST("SalesOrder/ADDToCart",FinalJson).subscribe(response=>{
      console.log(response);
       loadingPopup.dismiss();

      Toast.show("Added To Cart", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      });
    
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
        this.navCtrl.setRoot(Product);

    },error=>{
      loadingPopup.dismiss();
      alert("Error!!!");
    })
  }//Add to cart ended

  

   //////////////

  loadEvents() {
        this.eventSource = this.createRandomEvents();
    }
    
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
  
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
