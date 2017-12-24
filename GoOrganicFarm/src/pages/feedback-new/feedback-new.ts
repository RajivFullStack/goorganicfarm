import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Toast } from 'ionic-native';
import { FeedbackPage} from '../../pages/feedback/feedback';

import {HttpServices} from '../../app/services/http.services';
/*
  Generated class for the FeedbackNew page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feedback-new',
  templateUrl: 'feedback-new.html',
  styles: [`
   ul {
  padding: 0px;

  &.rating li {
    padding: 5px 10px !important;
    background: none;
    color: #ffb400;

    ion-icon {
      font-size: 30px;
    }
  }
}`],
})
export class FeedbackNewPage {
UserID :string;
FeedbackOptionList :any;
Rating : number;
SelectedOption : any;
Comment : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpServices:HttpServices,private loadingCtrl: LoadingController,
  private storage :Storage, private viewCtrl : ViewController ) {

this.storage.get('UserProfile').then((val) => {  
        let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Option...'
    });
      //this.UserName=val.UserName;
      if(val !=null){ 
       let profile=JSON.parse(val);
     
      loadingPopup.present();
      this.UserID=profile.UserID;
        
      this.httpServices.GET("Feedback/GetFeedbackOption").subscribe(res=>{

         this.FeedbackOptionList=res;//ListGroupSalesOrder
          console.log(res);
          loadingPopup.dismiss();
       });

      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackNewPage');
  }
  onModelChange(rating){
    console.log(rating);
    this.Rating=rating;
  }
  selectedOption(value){
    console.log(value);
    this.SelectedOption=value;
  }

  saveRating(){
    if(this.Comment == undefined || this.Comment ==null || this.Comment =="")
    {
      alert('Please provide comment');
      return;
    }
    if(this.SelectedOption == undefined || this.SelectedOption ==null || this.SelectedOption =="")
    {
      alert('Please select option');
      return;
    }
    if(this.Rating == undefined || this.Rating ==null || this.Rating <=0)
    {
      alert('Please provide Rating');
      return;
    }
    var json={"FeedbackOptionText":this.Comment,"Feedback_UserId" :this.UserID,
    "Feedback_OptionId" :this.SelectedOption,"Feedback_Rating" :this.Rating,"FeedbackComment":this.Comment};
     let loadingPopup = this.loadingCtrl.create({
      content: 'Creating...'
    });
    // Show the popup
    loadingPopup.present();
 this.httpServices.POST('Feedback/CreateFeedBack',json).subscribe(response=>{
       console.log(response);
      loadingPopup.dismiss();
      Toast.show("Feedback added !!!", '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      });
      const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
        this.navCtrl.setRoot(FeedbackPage);

    },err=>{
      console.log(err);
    })

  }

}
