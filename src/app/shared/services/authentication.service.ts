import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationResponseDto } from 'src/app/_interfaces/response/registrationResponseDto.model';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/user-for-authentication-dto';
import { UserForRegistrationDto } from 'src/app/_interfaces/user/userForRegistrationDto.model';
import { EnvironmentUrlService } from 'src/environments/environment-url.service';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelper: JwtHelperService) { }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    console.log(token);
 
    return token && !this._jwtHelper.isTokenExpired(token);
  }
  
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  
  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto> (this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }
  
}