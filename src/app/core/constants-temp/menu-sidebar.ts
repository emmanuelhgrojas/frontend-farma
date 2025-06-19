import { MenuItemSidebar } from "../interfaces/sidebar/menu-sidebar.model";

export const MENU_SIDEBAR_TEMP: MenuItemSidebar[] = [
  {
    label: 'Principal',
    isTitle: true,
    title: 'principal'
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard',
    mainTitle: 'principal'
  },
  {
    label: 'Administración',
    isTitle: true,
    title: 'administracion'
  },
  {
    label: 'Usuarios',
    icon: 'users',
    link: '/usuarios',
    mainTitle: 'administracion'
  },
  {
    label: 'Formato',
    icon: 'file-text',
    link: '/formato',
    mainTitle: 'administracion'
  } 
  ,
  {
    label: 'Formatos',
    icon: 'file-text',
    link: '/formatos',
    mainTitle: 'administracion'
  } 
];
