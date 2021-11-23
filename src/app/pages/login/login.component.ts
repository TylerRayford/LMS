import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpClient } from '@angular/common/http';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};



@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        public dialog: MatDialog
        
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
          this.openDialog()
            /* return error('Username or password is incorrect'); */
        }

        this.loading = true;
        this.http.post<any>("https://localhost:44301/api/accounts/login", JSON.stringify({username: this.f.username.value, password: this.f.password.value}), httpOptions).subscribe(/* data => this.Id = data.id */);
    }
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogComponent,{
        width: '640px',disableClose: true 
      });
  }l
    
}