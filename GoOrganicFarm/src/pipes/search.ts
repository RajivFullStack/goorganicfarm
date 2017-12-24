import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'search',
  pure: true
})
@Injectable()
export class Search {
  transform(lists: any[], searchTerm: string): any[] {
    
     if (searchTerm) {
        searchTerm = searchTerm.toUpperCase();
        
        return lists.filter(item => {
          return item.ProductCode.toUpperCase().indexOf(searchTerm) !== -1 
        });
      } else {
        return lists;
      }
  }
}