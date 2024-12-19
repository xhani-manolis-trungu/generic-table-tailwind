import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { GenericTableComponent } from '../components/generic-table/generic-table.component';
import { TableConfig } from '../components/generic-table/interfaces/config.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: Date;
  image: string;
}

@Component({
  selector: 'app-table-example',
  standalone: true,
  imports: [GenericTableComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Users Table</h1>
      <app-generic-table
        [data]="users"
        [config]="tableConfig"
        (rowClick)="onRowClick($event)"
      ></app-generic-table>
    </div>

    <ng-template #customCell let-item let-key="key">
      <div class="flex items-center">
        <img [src]="getSafeUrl(item[key])" alt="Image" class="w-5 h5 rounded-full" />
      </div>
    </ng-template>
  `,
})
export class TableExampleComponent implements AfterViewInit {
  @ViewChild('customCell') customCell!: TemplateRef<any>;
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      lastLogin: new Date('2023-12-01'),
      image:
        'https://media.istockphoto.com/id/1322104312/photo/freedom-chains-that-transform-into-birds-charge-concept.jpg?s=612x612&w=0&k=20&c=e2XUx498GotTLJn_62tPmsqj6vU48ZEkf0auXi6Ywh0=',
    },
    {
      id: 2,
      name: 'John Doe 2',
      email: 'john2@example.com',
      role: 'Admin2',
      lastLogin: new Date('2022-12-01'),
      image:
        'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
    },
    // Add more users as needed
  ];

  customColumnConfigs: {
    [key: string]: Partial<TableConfig<User>['columns'][number]>;
  } = {
    image: {
      title: 'Profile Picture',
      sortable: false,
      template: undefined, // Custom template for images
    },
    lastLogin: {
      title: 'Last Login Date',
      render: (item: User) => item.lastLogin.toLocaleDateString(),
    },
  };

  tableConfig: TableConfig<User> = {
    columns: Object.keys(this.users[0]).map((key) => {
      const defaultConfig = {
        key: key as keyof User,
        title: this.formatTitle(key),
        sortable: true,
        filterable: true,
      };

      // Merge default config with custom config (if available)
      return { ...defaultConfig, ...(this.customColumnConfigs[key] || {}) };
    }),
    actions: [
      {
        label: 'Edit',
        icon: 'fas fa-edit',
        buttonClass:
          'px-3 py-1 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700',
        onClick: (user: User) => this.editUser(user),
      },
      {
        label: 'Delete',
        icon: 'fas fa-trash',
        buttonClass:
          'px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700',
        onClick: (user: User) => this.deleteUser(user),
      },
    ],
    showSearch: false,
  };

  ngAfterViewInit(): void {
    this.tableConfig.columns.find((col) => col.key === 'image')!.template =
      this.customCell;
  }

  formatTitle(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  onRowClick(user: User): void {
    console.log('Row clicked:', user);
  }

  editUser(user: User): void {
    console.log('Edit user:', user);
  }

  deleteUser(user: User): void {
    console.log('Delete user:', user);
  }

  getSafeUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  constructor(private sanitizer: DomSanitizer) {}
}
