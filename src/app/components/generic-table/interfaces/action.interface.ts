export interface TableAction {
  label: string;
  icon?: string;
  buttonClass?: string;
  onClick: (item: any) => void;
}