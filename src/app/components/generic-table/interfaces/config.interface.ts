import { TableColumn } from './column.interface';
import { TableAction } from './action.interface';

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  actions?: TableAction[];
  showSearch?: boolean;
  itemsPerPage?: number;
}