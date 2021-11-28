import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  /* {
    path:"/login",
    title: 'Login Page',
    icon: "icon-button-pause",
    class: ""
  }, */
  {
    path: "/dashboard",
    title: "Clients",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/maps",
    title: "Maps",
    icon: "icon-pin",
    class: "" 
  },
  {
    path: "/tables",
    title: "Next Service",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path:"/history",
    title: 'Service History',
    icon: "icon-calendar-60",
    class: ""
  },
  {
    path:"/inactive",
    title: 'Inactive Clients',
    icon: "icon-calendar-60",
    class: ""
  },
  
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
