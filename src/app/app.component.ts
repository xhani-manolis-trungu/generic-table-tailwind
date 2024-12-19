import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableExampleComponent } from './examples/table-example.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TableExampleComponent],
  template: `
    <div class="container mx-auto p-4">
      <app-table-example></app-table-example>
    </div>
  `
})
export class AppComponent {}