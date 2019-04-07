// External Modules.
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

// My Modules.
import { CustomServerResponse } from '../../models/custom-server-response';
import { HelpersService } from '../../helpers/helpers.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUser: string;
  public isLogged: boolean;

  /**
   * Initialize the navbar component.
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
              private location: Location,
              private router: Router,
              private flashMessages: FlashMessagesService) {
    this.isLogged = false;
  }

  /**
   * Close the current user session.
   * 
   * @method onLogout.
   */
  public onLogout(): void {
    this.userService.logout();
    location.reload();
  }

  /**
   * Get profile the current user for determine if should show it in the navbar.
   * * successful show user in the navbar.
   * ! error redirect at the user to login if the expired token.
   * ! error redirect at the user to the home if any other error happens.
   * 
   * @method ngOnInit.
   */
  ngOnInit(): void {
    this.userService.profile()
      .subscribe(
        res => {
          //* successful get profile.
          if(res instanceof CustomServerResponse) {
            this.currentUser = this.userService.getUser();
            this.isLogged = true;
          }
        },
        err => {
          //! error get profile.
          if(err instanceof CustomServerResponse) {
            this.userService.logout();
            this.flashMessages.show(err.getMessage(), this.helpersService.setFailedMessage('5000'));
            switch(err.getStatus()) {
              case 401:
                //! error expired token.
                this.router.navigate(['user/login']);
                break;
              case 422:
                //! error token null.
                break;
              default:
                //! error other.
                this.router.navigate(['']);
            }
          }
        }
      );
  }

}
