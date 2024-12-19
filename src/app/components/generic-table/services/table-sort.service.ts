import { Injectable } from '@angular/core';
import { TableColumn } from '../interfaces/column.interface';

@Injectable({
  providedIn: 'root'
})
export class TableSortService {
  sort<T>(data: T[], column: TableColumn<T>, direction: 'asc' | 'desc'): T[] {
    return [...data].sort((a: any, b: any) => {
      let valueA = column?.render ? column.render(a) : a[column.key];
      let valueB = column?.render ? column.render(b) : b[column.key];

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}