import { UserForRegistrationDto } from './../../_interfaces/user/userForRegistrationDto.model';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordConfirmationValidatorService } from 'src/app/shared/custom-validators/password-confirmation-validator.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RegiseruserhelpmodalComponent } from 'src/app/components/regiseruserhelpmodal/regiseruserhelpmodal.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public registerForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  constructor(private _authService: AuthenticationService, private _passConfValidator: PasswordConfirmationValidatorService,
    private _router: Router, public dialog: MatDialog,public modal: MatDialog) { }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    

    this.registerForm.get('confirm').setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);
  }
  

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser = (registerFormValue) => {
    this.showError = false;
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    
    this._authService.registerUser("/accounts/registration", user)
    .subscribe(_ => {
      
      this.openDialog();

      this.registerForm.reset();
    },
    error => {
      this.errorMessage = error;
      this.showError = true;
      
    })
    
  }
  openDialog(): void {
      const dialogRef = this.dialog.open(DialogComponent,{
        width: '300px',disableClose: true 
      });
  }
  openModal(): void {
    console.log('help')
    const dialogRef = this.modal.open(RegiseruserhelpmodalComponent,{
      width: '640px',disableClose: true 
      
    });

  }
  

  
}