import { TemplateRef } from '@angular/core';

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (item: T) => string | number;
  template?: TemplateRef<{ $implicit: T; key: keyof T }>; // custom template
}
