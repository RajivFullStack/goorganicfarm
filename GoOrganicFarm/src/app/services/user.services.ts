import {Injectable} from '@angular/core';
 import { Storage } from '@ionic/storage';

@Injectable()
    export class UserServices{
        UserProfile: any;
       
        constructor( private storage :Storage){
       
  }
      GetProfile() : any{
        
        this.storage.get('UserProfile').then((val) => {
           
      //this.UserName=val.UserName;
      if(val !=null){
         
       let profile=JSON.parse(val);
      // this.UserProfile=profile;
      console.log(profile);
       return profile.UserID;
      
      }
      else{
       //alert('not found!!!');
       this.UserProfile=null;
        return this.UserProfile;
      }
      
     })
      
         
      } 
    
 }

        
    
