// External Modules.
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSmartModalService } from 'ngx-smart-modal';

// My Modules.
import { CustomServerResponse } from '../../models/custom-server-response';
import { UserService } from '../../services/user.service';
import { HelpersService } from '../../helpers/helpers.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements OnInit {

  /**
   * Initialize the custom modal component.
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
              private location: Location,
              private router: Router,
              private flashMessages: FlashMessagesService,
              public ngxSmartModalService: NgxSmartModalService) {
  }

  /**
   * Remove user.
   * * successful the logout and redirect it to the home.
   * ! error redirect at the user to login if the expired token.
   * ! error redirect at the user to the home if any other error happens.
   * 
   * @method onRemoveUser.
   */
  public onRemoveUser(): void {
    this.ngxSmartModalService.close('customModal');
    this.userService.removeUser()
      .subscribe(
        res => {
          //* successful remove user.
          if(res instanceof CustomServerResponse) {
            this.userService.logout();
            this.flashMessages.show(res.getMessage(), this.helpersService.setSuccessfulMessage('5000'));
            location.reload();
            this.router.navigate(['']);
          }
        },
        err => {
          //! error remove user.
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

  ngOnInit() {
  }

}
