// External Modules.
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// My Modules.
import { User } from '../../../models/user';
import { CustomServerResponse } from '../../../models/custom-server-response';
import { HelpersService } from '../../../helpers/helpers.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;

  /**
   * Initialize the login component.
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
  }

  /**
   * User login.
   * * successful save the user's information and redirect it to the home.
   * ! error login.
   * 
   * @method onSignIn.
   * @param {NgForm} form: Angular module.
   */
  public onSignIn(form: NgForm): void {
    if(form.valid) {
      //* successful valid form.
      let { email, password } = form.value;
      this.user.email = email;
      this.user.password = password;
      this.userService.signIn(this.user)
        .subscribe(
          res => {
            //* successful login.
            if(res instanceof CustomServerResponse) {
              this.userService.setUser(res.getBody().username);
              this.userService.setToken(res.getBody().token);
              this.flashMessages.show(res.getMessage(), this.helpersService.setSuccessfulMessage('5000'));
              this.router.navigate(['']);
              setTimeout(() => {
                location.reload();
              }, 3000);
            }
          },
          err => {
            //! error login.
            if(err instanceof CustomServerResponse) {
              this.user.password = '';
              this.flashMessages.show(err.getMessage(), this.helpersService.setFailedMessage('5000'));
            }
          }
        );
    }
  }

  ngOnInit() {
  }

}
