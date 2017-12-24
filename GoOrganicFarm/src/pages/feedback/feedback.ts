import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpServices} from '../../app/services/http.services';
import { FeedbackNewPage} from '../../pages/feedback-new/feedback-new';

/*
  Generated class for the Feedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
UserID :string;
FeedbackList :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices: HttpServices, 
  private loadingCtrl: LoadingController,private storage :Storage) {

    this.storage.get('UserProfile').then((val) => {  
        let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Feedback...'
    });
      //this.UserName=val.UserName;
      if(val !=null){ 
       let profile=JSON.parse(val);
     
      loadingPopup.present();
      this.UserID=profile.UserID;
        
      this.httpServices.GET("Feedback/GetFeedbackByUserID?userID="+this.UserID).subscribe(res=>{

         this.FeedbackList=res;//ListGroupSalesOrder
         console.log(res);
          loadingPopup.dismiss();
       },
       err=>{
         console.log(err);
          loadingPopup.dismiss();
          alert('Error in Get Feedback');
       });

      }
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
 AddNewFeedback(){
     this.navCtrl.push(FeedbackNewPage, {
     // item: item
    });
  }
}
