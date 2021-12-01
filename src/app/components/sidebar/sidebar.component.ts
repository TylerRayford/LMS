import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/shared/services/authentication.service";

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
    icon: "icon-bell-55",
    class: ""
  },
  {
    path:"/inactive",
    title: 'Inactive Clients',
    icon: "icon-notes",
    class: ""
  },
  {
    path:"/register",
    title: 'Register New User',
    icon: "icon-settings-gear-63",
    class: ""
  },
  {
    path:"/manageusers",
    title: 'Manage Active Users',
    icon: "icon-badge",
    class: ""
  },
  {
    path:"/inactiveloginusers",
    title: 'Manage Inactive Users',
    icon: "icon-simple-delete",
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
  public isUserAuthenticated: boolean;

  constructor(private _authService: AuthenticationService, private router: Router,) {
    this._authService.authChanged
    .subscribe(res => {
      console.log('res' + res);
      this.isUserAuthenticated = res;
      console.log('authUser' + this.isUserAuthenticated);
    })   

  }

  ngOnInit(): void {
    console.log('side')
    if (this._authService.isUserAuthenticated()){
      console.log('authenticated');
      this.isUserAuthenticated = true;
      console.log('isUserAuthenticated' + this.isUserAuthenticated)
    }
 
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout() {
    console.log('here');
    this._authService.logout();
    this._authService.sendAuthStateChangeNotification(false);
    this.router.navigate(["/"]);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
