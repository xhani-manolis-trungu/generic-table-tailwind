import { Injectable } from '@angular/core';
import { TableColumn } from '../interfaces/column.interface';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
  filter<T extends object>(data: T[], searchText: string, columns: TableColumn<T>[]): T[] {
    if (!searchText) return data;
    
    const searchLower = searchText.toLowerCase();
    return data.filter(item => 
      columns.some(col => 
        col.filterable && 
        col.key in item && 
        String((item as any)[col.key]).toLowerCase().includes(searchLower)
      )
    );
  }
}