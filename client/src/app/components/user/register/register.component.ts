// External Modules.
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// My Modules.
import { User } from '../../../models/user';
import { CustomFormError } from './../../../models/custom-form-error';
import { CustomServerResponse } from '../../../models/custom-server-response';
import { HelpersService } from '../../../helpers/helpers.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public customFormError: CustomFormError;

  /**
   * Initialize the register component.
   * 
   * @constructor
   * @param {UserService} userService: user service for handling sessions and communication with the server.
   * @param {HelpersService} helpersService: helpers service for handling common issues of the components.
   * @param {Location} location: Angular module.
   * @param {Router} router: Angular module.
   * @param {FlashMessagesService} flashMessages: service for showing flash messages.
   */
  constructor(private userService: UserService,
              private helpersService: HelpersService,
              private router: Router,
              private flashMessages: FlashMessagesService) {
    this.user = new User();
    this.customFormError = new CustomFormError();
  }

  /**
   * Event reCAPTCHA module.
   * 
   * @method resolved.
   * @param {string} captchaResponse: response from the server.
   */
  public resolved(captchaResponse: string): void {
    this.user.captcha = captchaResponse;
  }

  /**
   * Clear the errors of the form.
   * 
   * @method onClearError.
   * @param event: Angular event.
   */
  public onClearError(event): void {
    this.helpersService.resetError(event, this.customFormError);
  }

    /**
   * Edit user profile.
   * * successful redirect at the user to login.
   * ! error in the username.
   * ! error in the email.
   * ! error in the password.
   * ! error in the server.
   * 
   * @method onSignUp.
   * @param {NgForm} form: Angular module.
   */
  public onSignUp(form: NgForm): void {
    if(form.valid) {
      //* successful valid form.
      let { username, email, password, confirmPassword } = form.value;
      this.user.username = username;
      this.user.email = email;
      this.user.password = password;
      this.user.confirmPassword = confirmPassword;
      this.userService.signUp(this.user)
        .subscribe(
          res => {
            //* successful register.
            if(res instanceof CustomServerResponse) {
              this.flashMessages.show(res.getMessage(), this.helpersService.setSuccessfulMessage('5000'));
              this.router.navigate(['user/login']);
            }
          },
          err => {
            //! error register.
            if(err instanceof CustomServerResponse) {
              this.user.captcha = '';
              //? check if there are errors in the inputs.
              if(!this.helpersService.isEmptyJSON(err.getBody())) {
                if(err.hasUsernameError()) {
                  //! error in the username.
                  this.customFormError.showUsername(err.getBody().username);
                }
                if(err.hasEmailError()) {
                  //! error in the email.
                  this.customFormError.showEmail(err.getBody().email);
                }
                if(err.hasNewPasswordError()) {
                  //! error in the password.
                  this.customFormError.showNewPassword(err.getBody().password);
                }
              }
              //? check if there are internal server error.
              if(err.getStatus() == 500) {
                //! error in the server.
                this.flashMessages.show(err.getMessage(), this.helpersService.setFailedMessage('5000'));
              }
            }
          }
        );
    }
  }
  
  ngOnInit() {
  }

}
