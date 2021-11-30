import { Component, HostListener, OnInit } from "@angular/core";
import { AuthenticationService } from "./shared/services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Larson Medical Supply";
 
  constructor(private _authService: AuthenticationService){}
  ngOnInit(): void {
    if(this._authService.isUserAuthenticated())
    console.log('here');
      this._authService.sendAuthStateChangeNotification(true);
  }
 
}
