
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;

  @HostListener('window:keydown', ['$event']) onKeyDown(event) {
   
    let e = <KeyboardEvent> event;
    console.log(e);
    if (this.OnlyNumber) {
      
      // if(e.keyCode==110 || e.keyCode==190){
          
      //      e.preventDefault();
      //     return;
      //   }
       if(e.keyCode==229  || e.key=="."){
         console.log('key found');
        
           e.preventDefault();
          // alert('Dot (.) are not allowed !!!')
           return false;
        }
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        
         
        // Ensure that it is a number and stop the keypress
        if ((e.keyCode ==110 || e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
      }
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/