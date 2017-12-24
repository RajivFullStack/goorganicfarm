import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgCalendarModule  } from 'ionic2-calendar';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Product } from '../pages/product/product';
import {LoginPage} from '../pages/login/login'
import { RegisterPage} from '../pages/register/register';
import { ProductDetailsPage} from '../pages/product-details/product-details';
import { ProductDetailsDaterangePage} from '../pages/product-details-daterange/product-details-daterange';
import {CartPage} from '../pages/cart/cart'
import {AddressPage} from '../pages/address/address'
import {AddEditAddressPage} from '../pages/add-edit-address/add-edit-address'
import {CheckoutPage} from '../pages/checkout/checkout'
import {MyorderPage} from '../pages/myorder/myorder'
import {MyorderDetailPage} from '../pages/myorder-detail/myorder-detail'
import {FeedbackPage} from '../pages/feedback/feedback'
import {FeedbackNewPage} from '../pages/feedback-new/feedback-new'
import {ResetPasswordPage} from '../pages/reset-password/reset-password'
// import {HttpService} from './services/@angular/http.services';

import { OnlyNumber } from './directive/onlynumber.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {Search} from '../pipes/search'
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Product,
    LoginPage,
    RegisterPage,
    ProductDetailsPage,
    ProductDetailsDaterangePage,
    CartPage,
    AddressPage,
    AddEditAddressPage,
    CheckoutPage,
    MyorderPage,
    MyorderDetailPage,
     FeedbackPage,
     FeedbackNewPage,
    OnlyNumber,
    Search,
    ResetPasswordPage
  ],
  imports: [NgCalendarModule,Ng2SearchPipeModule,Ionic2RatingModule,
  
    IonicModule.forRoot(MyApp,{mode : "md"})
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  
   
  entryComponents: [
    MyApp,
    Page1,
    Product,
    LoginPage,
    RegisterPage,
    ProductDetailsPage,
    ProductDetailsDaterangePage,
    CartPage,
    AddressPage,
    AddEditAddressPage,
    CheckoutPage,
    MyorderPage,
    MyorderDetailPage,
    FeedbackPage,
    FeedbackNewPage,
    ResetPasswordPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage]
})
export class AppModule {}
