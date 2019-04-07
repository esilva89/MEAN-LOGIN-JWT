// External Modules.
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  public user: User;
  public customFormError: CustomFormError;

  /**
   * Initialize the password component.
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
              private location: Location,
              private flashMessages: FlashMessagesService) {
    this.user = new User();
    this.customFormError = new CustomFormError();
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
   * Edit user password.
   * * successful reload the page.
   * ! error in the current password.
   * ! error in the new password.
   * ! error in the server.
   * 
   * @method onEditPassword.
   * @param {NgForm} form: Angular module.
   */
  public onEditPassword(form: NgForm) {
    if(form.valid) {
      //* successful valid form.
      let { currentPassword, newPassword, confirmNewPassword } = form.value;
      this.user.currentPassword = currentPassword;
      this.user.newPassword = newPassword;
      this.user.confirmNewPassword = confirmNewPassword;
      this.userService.editPassword(this.user)
        .subscribe(
          res => {
            //* successful edit password.
            if(res instanceof CustomServerResponse) {
              this.flashMessages.show(res.getMessage(), this.helpersService.setSuccessfulMessage('5000'));
              location.reload();
            }
          },
          err => {
            //! error edit password.
            if(err instanceof CustomServerResponse) {
              //? check if there are errors in the inputs.
              if(!this.helpersService.isEmptyJSON(err.getBody())) {
                if(err.hasCurrentPasswordError()) {
                  //! error in the current password.
                  this.customFormError.showCurrentPassword(err.getBody().currentPassword);
                }
                if(err.hasNewPasswordError()) {
                  //! error in the new password.
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
