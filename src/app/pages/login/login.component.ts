import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpClient } from '@angular/common/http';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/user-for-authentication-dto';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};



@Component({ 
  selector: 'app-login',
  templateUrl: 'login.component.html' 
})

export class LoginComponent implements OnInit {
  
    public loginForm: FormGroup;
    loading = false;
    submitted = false;
    public errorMessage: string = '';
    public showError: boolean;
    private _returnUrl: string;

    constructor(
        private _authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        public dialog: MatDialog
        
    ) { }

    ngOnInit() {
      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        location.reload() 
      } else {
        localStorage.removeItem('foo') 
      }
        localStorage.removeItem("token");
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public validateControl = (controlName: string) => {
      return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
    }
    public hasError = (controlName: string, errorName: string) => {
      return this.loginForm.controls[controlName].hasError(errorName)
    }

    // // convenience getter for easy access to form fields
    // get f() { return this.form.controls; }

  //   onSubmit() {
  //       this.submitted = true;

  //       // stop here if form is invalid
  //       if (this.form.invalid) {
  //         this.openDialog()
  //           /* return error('Username or password is incorrect'); */
  //       }

  //       this.loading = true;
  //       this.http.post<any>("https://larsonmedicalapi.azurewebsites.net/api/accounts/login", JSON.stringify({username: this.f.username.value, password: this.f.password.value}), httpOptions).subscribe(/* data => this.Id = data.id */);
  //   }
  //   openDialog(): void {
  //     const dialogRef = this.dialog.open(DialogComponent,{
  //       width: '640px',disableClose: true 
  //     });
  // }l

  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }
    this._authService.loginUser('https://larsonmedicalapi.azurewebsites.net/api/accounts/login', userForAuth)
    .subscribe(res => {
       localStorage.setItem("token", res["token"]);
       this._authService.sendAuthStateChangeNotification(true);
       this.router.navigate(['/dashboard']);
    },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    })
  }
    
}