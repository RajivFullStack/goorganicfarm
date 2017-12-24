// import {Injectable} from '@angular/core';
 
// import { Storage, SqlStorage, LocalStorage } from 'ionic-framework/ionic';
// import {Http} from '@angular/http';

// @Injectable()
//  export class CurrentUser {
//  local: Storage;

//    constructor(private http: Http, private _profile: IProfile) {
//     this.local = new Storage(LocalStorage);
// }

//     setProfile(UserName: string, token: string, UserID :string): void {
//     // this._profile.token = token;
//       this._profile.UserName = UserName;
//      this._profile.LoggedIn = true;
//      this._profile.UserID = UserID;
//      this.local = new Storage(LocalStorage);
//      let val = JSON.stringify(this._profile);
//      this.local.set("user-profile", val);
//     }
//     getProfile(): any {
//     this.local.get("user-profile").then((profile) => {
//      var val = JSON.parse(profile);
//     console.log(val);
//     return profile;
//         });
//     }
//  }

//  export interface IProfile{
//      UserName: string;
//      LoggedIn :boolean;
//      UserID :string;


//  }
