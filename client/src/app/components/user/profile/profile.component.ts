// External Modules.
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSmartModalService } from 'ngx-smart-modal';

// My Modules.
import { User } from '../../../models/user';
import { CustomFormError } from './../../../models/custom-form-error';
import { CustomServerResponse } from '../../../models/custom-server-response';
import { HelpersService } from '../../../helpers/helpers.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  public user: User;
  public customFormError: CustomFormError;

  /**
   * Initialize the profile component.
   * 
   * @constructor
   * @param {UserService} userService: user service for handling sessions and communication with the server.
   * @param {HelpersService} helpersService: helpers service for handling common issues of the components.
   * @param {Location} location: Angular module.
   * @param {Router} router: Angular module.
   * @param {FlashMessagesService} flashMessages: service for showing flash messages.
   * @param {NgxSmartModalService} ngxSmartModalService: service for managing modals.
   */
  constructor(private userService: UserService,
              private helpersService: HelpersService,
              private router: Router,
              private location: Location,
              private flashMessages: FlashMessagesService,
              public ngxSmartModalService: NgxSmartModalService) {
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
   * Edit user profile.
   * * successful reload the page.
   * ! error in the username.
   * ! error in the email.
   * ! error in the server.
   * 
   * @method onEditProfile.
   * @param {NgForm} form: Angular module.
   */
  public onEditProfile(form: NgForm): void {
    if(form.valid) {
      //* successful valid form.
      let { username, email, firstName, lastName } = form.value;
      this.user.username = username;
      this.user.email = email;
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.userService.editProfile(this.user)
        .subscribe(
          res => {
            //* successful edit password.
            if(res instanceof CustomServerResponse) {
              this.flashMessages.show(res.getMessage(), this.helpersService.setSuccessfulMessage('5000'));
              location.reload();
            }
          },
          err => {
            //! error edit profile.
            if(err instanceof CustomServerResponse) {
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

  /**
   * Get profile the current user for load the user data.
   * * successful load the user data in the form.
   * ! error redirect at the user to login.
   * 
   * @method ngOnInit.
   */
  ngOnInit() {
    this.userService.profile()
      .subscribe(
        res => {
          //* successful get profile.
          if(res instanceof CustomServerResponse) {
            this.user.firstName = res.getBody().firstName;
            this.user.lastName = res.getBody().lastName;
            this.user.username = res.getBody().username;
            this.user.email = res.getBody().email;
          }
        },
        err => {
          //! error get profile.
          if(err instanceof CustomServerResponse) {
            this.userService.logout();
            this.router.navigate(['user/login']);
          }
        }
      );
  }

  /**
   * After rendering the component, the data is set to the modal to confirm the user's remove.
   */
  ngAfterViewInit() {
    const obj: Object = {
      title: ' Account Disabled',
      text: 'Are you sure to disable your account?\nYour data will be deleted in the database.',
      classTitle: 'p-2',
      classIcon: 'fas fa-exclamation-triangle text-warning mr-2',
      classText: 'white-space-pre-line p-2 ml-3',
      classBtnAccept: 'btn btn-success m-2',
      classBtnClose: 'btn btn-dark m-2',
      hasIcon: true,
      hasBtnAccept: true,
      action: 'onRemoveUser'
    };

    this.ngxSmartModalService.setModalData(obj, 'customModal');
  }

}