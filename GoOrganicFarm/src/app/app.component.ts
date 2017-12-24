import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import {HttpServices} from './services/http.services';
 

import { Page1 } from '../pages/page1/page1';
import { Product } from '../pages/product/product';
import { LoginPage} from '../pages/login/login';
import { AddressPage} from '../pages/address/address';
import { MyorderPage} from '../pages/myorder/myorder';
import { FeedbackPage} from '../pages/feedback/feedback';

 

@Component({
  templateUrl: 'app.html',
  providers :[HttpServices]
   
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  UserName :string='User';
  UserID : string;

  rootPage: any ;//= LoginPage;
  activePage : any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private storage :Storage,private httpServices : HttpServices) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Product List', component: Product },
      { title: 'Profile', component: Page1 },
      {title : 'My Orders', component : MyorderPage},
      {title : 'Manage Address', component : AddressPage},
      {title : 'Feedback', component : FeedbackPage}
    ];

    this.activePage=this.pages[0];

    
  }


  initializeApp() {
    this.platform.ready().then(() => {

    
      this.storage.get('UserProfile').then((val) => {
      //this.UserName=val.UserName;
      if(val !=null){
          
       let profile=JSON.parse(val);
       
       this.UserName=profile.UserName;
       this.UserID=profile.UserID;
       this.httpServices.GET_TOKEN(profile.userName,profile.Password).subscribe(response=>{
       console.log(response);
        Splashscreen.hide();
        if(response !=null){
          this.httpServices.SET_TOKEN(response.access_token);
        this.storage.set('token',response.access_token);
        response.UserName=response.FirstName;
         response.Email=profile.EmailID;
          response.Password=profile.Password;
         console.log(response);
        let val = JSON.stringify(response);
        this.storage.set('UserProfile', val);
         this.rootPage=Product;
         
      }
      else{
        console.log(response);
        alert('Session Expired!!!');
           this.storage.clear();
           this.rootPage=LoginPage;
      }
       },
       err=>{
         console.log(err);
         alert('Session Expired! ');
           this.storage.clear();
           this.rootPage=LoginPage;
       });
      
      
      }
      else{
        //If user password not saved in device
      
      //this.rootPage=Product;
      //Dev Mode
    if(this.platform._platforms[2]=="mobileweb")
    {
        // let val = JSON.stringify({UserID : "77167def-e79a-4d93-b1fb-9cd1f279e321",UserName : "Dev Test"});
        // console.log(val);
        // this.storage.set('UserProfile', val);
       this.rootPage=LoginPage; 
    }
    else{
        Splashscreen.hide();
        this.rootPage=LoginPage;
    }
      }
      
     })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage=page;
  }

  checkActive(page){
    return page==this.activePage;
  }
  signOut(){
    console.log('signout called');
    this.storage.clear();
     this.rootPage=LoginPage;
  }
}
