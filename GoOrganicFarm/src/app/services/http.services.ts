import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';

@Injectable()
    export class HttpServices{
        http: any;
        baseURL : String;
         token :string;

        constructor(http : Http ,private storage :Storage){
            this.http=http;
            this.baseURL="http://api.goorganicfarm.com/Api";
             this.storage.get('token').then((val) => {
                 console.log(val);
                 this.token=val;
              });
            
        }
        SET_TOKEN(TOKEN :any){
            console.log('checking token : '+this.token);
            if(this.token==null){
                this.token=TOKEN;
                console.log('setting token : '+this.token);
            }
        }
        GET_TOKEN(username,password){
            console.log(username);
            console.log(password);
            let data = new URLSearchParams();
            data.append('grant_type','password');
            data.append('username', username);
            data.append('password', password);
            console.log(data);
            return this.http.post('http://api.goorganicfarm.com/token', data).map(res=>res.json());
                        
        }
         POSTWithoutToken(apiName,requestData){ 
             console.log(requestData);
            return this.http.post(this.baseURL+"/"+apiName,requestData)
            .map(res=>res.json());
        }
        GET(apiName){
          
            let headers  = new Headers({'Content-Type': 'application/json'});  
            headers.append('Authorization','bearer '+this.token);
            let options = new RequestOptions({headers: headers});
            console.log(this.baseURL+"/"+apiName);
            console.log(options);
            return this.http.get(this.baseURL+"/"+apiName,options)
            .map(res=>res.json());
        }
        POST(apiName,requestData){
             console.log(requestData);
            let headers  = new Headers({'Content-Type': 'application/json'});  
            headers.append('Authorization','bearer '+this.token);
            let options = new RequestOptions({headers: headers});
           
            return this.http.post(this.baseURL+"/"+apiName,requestData,options)
            .map(res=>res.json());
        }
        DELETE(apiName,params){
            return this.http.delete(this.baseURL+"/"+apiName+"/"+params)
            .map(res=>res.json());
        }
    }
