import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: string[], searchTerm: string): string[] {
    if (!searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(searchTerm));
  }
}