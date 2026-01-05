export interface NavbarAction {
  type: 'notification' | 'icon' | 'primary' | 'secondary';
  icon?: string;
  label?: string;
  onClick?: () => void;
}



export interface NavbarConfig {
  title: string;
  subtitle?: string;
  actions?: NavbarAction[];
  notifications?: number;
}