import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableColumn } from './interfaces/column.interface';
import { TableConfig } from './interfaces/config.interface';
import { TableAction } from './interfaces/action.interface';
import { TableSortService } from './services/table-sort.service';
import { TableFilterService } from './services/table-filter.service';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent<T extends object> {
  @Input() data: T[] = [];
  @Input() config!: TableConfig<T>;
  @Output() rowClick = new EventEmitter<T>();

  searchText: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private sortService: TableSortService,
    private filterService: TableFilterService
  ) {}

  get filteredData(): T[] {
    let filtered = this.filterService.filter(
      this.data,
      this.searchText,
      this.config.columns
    );

    if (this.sortColumn) {
      const column = this.config.columns.find(
        (col) => col.key === this.sortColumn
      );
      if (column) {
        filtered = this.sortService.sort(filtered, column, this.sortDirection);
      }
    }

    return filtered;
  }

  sort(column: TableColumn<T>): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key as keyof T as string;
      this.sortDirection = 'asc';
    }
  }

  getCellValue(item: T, column: TableColumn<T>): string | number {
    return column.render
      ? column.render(item)
      : (item[column.key as keyof T] as string | number);
  }

  handleAction(action: TableAction, item: T): void {
    action.onClick(item);
  }
}
